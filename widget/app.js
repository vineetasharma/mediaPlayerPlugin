(function (angular, buildfire) {
    "use strict";
    //created MediaPlayerPluginWidget module
    angular
        .module('MediaPlayerPluginWidget',
        [
            'ngAnimate',
            'ui.bootstrap',
            'MediaPlayerPluginWidgetFilters',
            'MediaPlayerModals',
            'MediaPlayerWidgetServices',
            'ngTouch'
        ])
        //injected ngRoute for routing
        //injected ui.bootstrap for angular bootstrap component
        .config(['$compileProvider', function ($compileProvider) {

            /**
             * To make href urls safe on mobile
             */
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|cdvfile|file):/);

        }]).run(['$rootScope',function ($rootScope) {
            buildfire.navigation.onBackButtonClick = function () {
                console.log('Back Button called-----------------------------');
                if ($rootScope.openPlaylist) {
                    $rootScope.openPlaylist=false;
                    $rootScope.$digest();
                }
                else
                    buildfire.navigation._goBackOne();
            }
        }]);
})
(window.angular, window.buildfire);
