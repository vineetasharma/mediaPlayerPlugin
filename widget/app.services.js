(function (angular, buildfire, location) {
    'use strict';
    //created MediaPlayerWidgetServices module
    angular
        .module('MediaPlayerWidgetServices', [])
        .provider('Buildfire', [function () {
            this.$get = function () {
                return buildfire;
            };
        }]);
})(window.angular, window.buildfire, window.location);