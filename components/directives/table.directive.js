(function () {
  'use strict';

  angular
    .module('complexTable')
    .directive('flexTable', flexTable);

  function flexTable() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        sorting: '=',
        paging: '=',
        data: '=',
        selected: '=',
        allSelected: '=',
        actions: '=',
        visibility: '=',
        tablePaging: '=',
        columnsToggled: '=',
        tableType: '@'
      },
      templateUrl: 'components/directives/table.html',
      controller: Controller,
      link: Link
    };

    function Controller($scope, $rootScope) {
      // todo: extract as mixin outside of table scope
      $scope.hiddenColumnNumber = [];
      $scope.hiddenColumns = [];
      $scope.selectedCheckboxes = [];

      $scope.sort = sort;
      $scope.applyAction = applyAction;
      $scope.getSortingClass = getSortingClass;
      $scope.getTotalColCount = getTotalColCount;

      var deregisterResizeListener = $rootScope.$on('window:resize', function () {
        $scope.scrollerReset();
      });
      $scope.$on('$destroy', deregisterResizeListener);

      function getTotalColCount() {
        return $scope.columnsToggled.maxColumns - $scope.columnsToggled.unchecked.length;
      }

      function sort(type) {
        if (_.isEqual($scope.sorting.type, type)) {
          $scope.sorting.asc = !$scope.sorting.asc;
        } else {
          $scope.sorting.type = type;
          $scope.sorting.asc = false;
        }
        applyAction('sorting', $scope.sorting);
      }

      function getSortingClass(type) {
        var result = '';
        if (_.isEqual(type, $scope.sorting.type)) {
          result = $scope.sorting.asc ? 'col-active_asc' : 'col-active_desc';
        }
        return result;
      }

      function applyAction(type, item) {
        if ($scope.actions && $scope.actions[type]) {
          return $scope.actions[type](item);
        }
      }

      // todo: transfer to data object and turn into one way data flow
      if (angular.isDefined($scope.columnsToggled)) {
        $scope.hiddenColumnNumber = $scope.columnsToggled.unchecked;
        $scope.$watch('columnsToggled.unchecked', toggleColumns, true);
      }

      function toggleColumns() {
        $scope.hiddenColumns = [];
        _.forEach($scope.hiddenColumnNumber, function (value) {
          $scope.hiddenColumns.push('hide-' + value);
        });
        $scope.scrollerReset();
      }
    }

    function Link(scope) {
      scope.moveRight = moveRight;
      scope.slideTable = slideTable;
      scope.scrollerReset = scrollerReset;

      scope.moveLeftVal = 0;
      scope.reachedRightEnd = false;
      scope.reachedLeftEnd = true;
      scope.scrollCount = 0;
      scope.activeRow = 0;

      function scrollerReset() {
        scope.moveLeftVal = 0;
        scope.reachedRightEnd = false;
        scope.reachedLeftEnd = true;
        scope.scrollCount = 0;
        scope.activeRow = 0;
      }

      function checkSliderLocation() {
        var beaconEl = document.getElementsByClassName('beacon')[0]; // eslint-disable-line angular/document-service
        var beaconStyle = window.getComputedStyle(beaconEl);  // eslint-disable-line angular/window-service
        var beaconVal = beaconStyle.getPropertyValue('width');
        scope.scrollCount = parseInt(beaconVal, 10);
      }

      function moveRight() {
        if (scope.moveLeftVal !== 0) {
          scope.moveLeftVal--;
          scope.reachedRightEnd = false;
          if (scope.moveLeftVal === 0) {
            scope.reachedLeftEnd = true;
          }
        } else {
          return false;
        }
      }

      function moveLeft() {
        if (scope.moveLeftVal !== scope.scrollCount) {
          scope.moveLeftVal++;
          scope.reachedLeftEnd = false;
          if (scope.moveLeftVal === scope.scrollCount) {
            scope.reachedRightEnd = true;
          }
        }
      }

      function slideTable(direction) {
        checkSliderLocation();
        if (direction === 'left') {
          moveLeft();
        } else {
          moveRight();
        }
      }
    }
  }
})();
