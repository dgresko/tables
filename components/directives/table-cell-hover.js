(function () {
  'use strict';

  angular
    .module('complexTable')
    .directive('tableCellHover', tableCellHover);

  function tableCellHover($rootScope) {
    return {
      restrict: 'A',
      link: Link
    };
    function Link(ignored, $element, $attrs) {
      $element.on('mouseenter', function () {
        $rootScope.$emit('cell:hover', +$attrs.tableCellHover);
      }).on('mouseleave', function () {
        $rootScope.$emit('cell:hover:end', +$attrs.tableCellHover);
      }).on('click', function () {
        if (!$element.hasClass('cell-vertical')) { return; }
        $rootScope.$emit('cell:clicked', $element);
      });
    }
  }
})();
