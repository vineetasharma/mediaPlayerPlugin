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
        .directive("loadImage", ['Buildfire', function (Buildfire) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.attr("src", "../../../styles/media/holder-" + attrs.loadImage + ".gif");

                    var _img = attrs.finalSrc;
                    if (attrs.cropType == 'resize') {
                        Buildfire.imageLib.local.resizeImage(_img, {
                            width: attrs.cropWidth,
                            height: attrs.cropHeight
                        }, function (err, imgUrl) {
                            _img = imgUrl;
                            replaceImg(_img);
                        });
                    } else {
                        Buildfire.imageLib.local.cropImage(_img, {
                            width: attrs.cropWidth,
                            height: attrs.cropHeight
                        }, function (err, imgUrl) {
                            _img = imgUrl;
                            replaceImg(_img);
                        });
                    }

                    function replaceImg(finalSrc) {
                        var elem = $("<img>");
                        elem[0].onload = function () {
                            element.attr("src", finalSrc);
                            elem.remove();
                        };
                        elem.attr("src", finalSrc);
                    }
                }
            };
        }])
        .directive('backImg', ["$rootScope", function ($rootScope) {
            return function (scope, element, attrs) {
                attrs.$observe('backImg', function (value) {
                    var img = '';
                    if (value) {
                        buildfire.imageLib.local.cropImage(value, {
                            width: $rootScope.deviceWidth,
                            height: $rootScope.deviceHeight
                        }, function (err, imgUrl) {
                            if (imgUrl) {
                                img = imgUrl;
                                element.attr("style", 'background:url(' + img + ') !important ; background-size: cover !important;');
                            } else {
                                img = '';
                                element.attr("style", 'background-color:white');
                            }
                            element.css({
                                'background-size': 'cover'
                            });
                        });
                        // img = $filter("cropImage")(value, $rootScope.deviceWidth, $rootScope.deviceHeight, true);
                    }
                    else {
                        img = "";
                        element.attr("style", 'background-color:white');
                        element.css({
                            'background-size': 'cover'
                        });
                    }
                });
            };
        }])
      .run(['$rootScope',function ($rootScope) {
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
