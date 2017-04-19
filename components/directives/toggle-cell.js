(function () {
  'use strict';

  angular
    .module('complexTable')
    .directive('toggleCell', toggleCell);

  function toggleCell($timeout, $rootScope) {
    return {
      restrict: 'A',
      scope: true,
      controller: Controller
    };
    function Controller($scope, $element, $timeout) {
      // TimeoutCleanerDecorator.decorate($scope);
      $scope.verticalCheck = verticalCheck;
      // $scope.environment = EnvironmentService;

      var rows = [],
        extendedIndexes = [],
        currentIndex = null,
        activeCell = null,
        extendablePrefix = 'col-extendable__',
        extendedPrefix = 'col-active-',
        activeCellClass = 'cell-vertical__open',
        hoverTracker = $rootScope.$on('cell:hover', cellHovered),
        hoverEndTracker = $rootScope.$on('cell:hover:end', cellHoverEnd),
        clickTracker = $rootScope.$on('cell:clicked', openVertical);

      // if (!$scope.environment.isMobile) { findExtendable(); }
      findExtendable();

      $scope.$watch('data', recalculate, true);
      function recalculate(value, old) {
        if (value === old) { return; }
        findExtendable();
        // $scope._timeouts.push($timeout(function () {
        //   findExtendable();
        // }));
      }

      function cellHovered(e, index) {
        if (index === currentIndex) { return; }
        var elementClasses = $element[0].className.split(' ').filter(function (c) {
          return c.indexOf(extendedPrefix + currentIndex) !== 0;
        });
        if (extendedIndexes.indexOf(index) !== -1) {
          elementClasses.push(extendedPrefix + index);
          $timeout(function () {
            verticalCheck(index);
          }, 100);
        }
        $element[0].className = elementClasses.join(' ');
        currentIndex = index;
      }

      function cellHoverEnd(e, index) {
        if (activeCell) {
          activeCell.removeClass(activeCellClass);
          activeCell = null;
        }
      }

      $element.on('mouseleave', function () {
        $element.removeClass(extendedPrefix + currentIndex);
        currentIndex = null;
      });

      $scope.$watch('environment.isMobile', environmentChange);
      function environmentChange(value, old) {
        if (value === old) { return; }
        findExtendable();
        // if (!$scope.environment.isMobile) {
        //   findExtendable();
        // }
      }

      function isExtandable(cell) {
        return cell.offsetWidth < cell.scrollWidth;
      }

      function columnHasExtendableCell(rows, index) {
        var result = false, rowCount = rows.length, rowIndex = 0;
        for (; rowIndex < rowCount; rowIndex++) {
          if (isExtandable(rows[rowIndex].children[index])) {
            result = true;
            break;
          }
        }
        return result;
      }

      function extendableSearch() {
        extendedIndexes = [];
        var extendedClasses = [];
        rows = $element[0].querySelectorAll('.flex-table-body__row'); // eslint-disable-line
        if (rows.length) {
          var columnCount = rows[0].children.length,
            columnIndex = 0;
          for (; columnIndex < columnCount; columnIndex++) {
            if (columnHasExtendableCell(rows, columnIndex)) {
              extendedClasses.push(extendablePrefix + columnIndex);
              extendedIndexes.push(columnIndex);
            }
          }
          applyExtendableClasses(extendedClasses);
        }
      }

      function applyExtendableClasses(classes) {
        var clearClasses = $element[0].className.split(' ').filter(function (c) {
          return c.indexOf(extendablePrefix) === -1;
        });
        $element[0].className = _.concat(clearClasses, classes).join(' ');
      }

      function findExtendable() {
        var searchTimeout = $timeout(function () {
          // if ($scope.environment.isFireFox) {
          //   setTimeout(function () {  // eslint-disable-line
          //     extendableSearch();
          //   }, 100);
          // } else {
          //   extendableSearch();
          // }
          extendableSearch();
        });
        $timeout(searchTimeout, 200);
      }

      function openVertical(e, cell) {
        activeCell = cell;
        cell.addClass(activeCellClass);
      }

      function verticalCheck(cell) {
        var currentCol = $element[0].querySelectorAll('.col-' + cell);
        // if ($scope.environment.isMobile) { return; }
        var verticalCheckTimeout = $timeout(function () {
          _.forEach(currentCol, function (index) {
            var cellEl = angular.element(index);

            if (isExtandable(index)) {
              cellEl.addClass('cell-vertical');
            }
          });
        }, 100);
        $timeout(verticalCheckTimeout);
      }

      function unRegisterEvents() {
        hoverTracker();
        hoverEndTracker();
        clickTracker();
      }

      $scope.$on('$destroy', unRegisterEvents);
    }
  }
})();
