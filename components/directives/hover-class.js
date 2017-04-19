(function () {
  'use strict';

  angular
    .module('complexTable')
    .constant('HOVER_CONFIG', {
      hoverClass: 'row-hovered'
    })
    .directive('hoverClass', hoverClass);

  function hoverClass(HOVER_CONFIG, $timeout) {
    return {
      restrict: 'A',
      scope: true,
      link: Link
    };

    function Link(scope, $element, attrs) {
      $timeout(function () {
        var fixedCol = null;
        if (attrs.hoverClass) {
          fixedCol = angular.element(document.getElementById(attrs.hoverClass));  // eslint-disable-line
        }
        attachHoverListener($element, fixedCol);
        if (fixedCol) {
          attachHoverListener(fixedCol, $element);
        }
      });
    }

    function attachHoverListener(element, target) {
      element.on('mouseenter', function () {
        element.addClass(HOVER_CONFIG.hoverClass);
        if (target) {
          target.addClass(HOVER_CONFIG.hoverClass);
        }
      }).on('mouseleave', function () {
        element.removeClass(HOVER_CONFIG.hoverClass);
        if (target) {
          target.removeClass(HOVER_CONFIG.hoverClass);
        }
      });
    }
  }
})();
