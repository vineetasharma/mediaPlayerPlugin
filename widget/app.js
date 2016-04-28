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

        }])
      .directive("loadImage", [function () {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            element.attr("src", "../../../styles/media/holder-" + attrs.loadImage + ".gif");

            var elem = $("<img>");
            elem[0].onload = function () {
              element.attr("src", attrs.finalSrc);
              elem.remove();
            };
            elem.attr("src", attrs.finalSrc);
          }
        };
      }])
      .run(['$rootScope',function ($rootScope) {
            buildfire.history.onPop(function(data, err){
                console.log('buildfire.history.onPop----------------------------',data,'Error------------------',err);

                if ($rootScope.openPlaylist) {
                    $rootScope.openPlaylist=false;
                    $rootScope.$digest();
                }
            });
        }]);
})
(window.angular, window.buildfire);
