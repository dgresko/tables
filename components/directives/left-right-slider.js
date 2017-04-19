(function () {
    'use strict';

    angular
        .module('complexTable')
        .directive('leftRightSlider', leftRightSlider);

    function leftRightSlider() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/directives/left-right-slider.html'
        };
    }
})();
