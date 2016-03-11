/**
 * Created by intelligrape on 11/3/16.
 */
describe('Unit : MediaPlayerPluginWidget Home Controller', function () {
    beforeEach(module('MediaPlayerPluginWidget'));

    var $controller, $scope, WidgetHome, $routeParams, Buildfire,rootScope;


    beforeEach(inject(function (_$controller_, _$rootScope_, _Buildfire_) {

        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        Buildfire = _Buildfire_;
        rootScope=_$rootScope_;

        WidgetHome = $controller('WidgetHomeCtrl', {
            $scope: $scope,
            $routeParams: $routeParams,
            media: {id: '1', data: {topImage: "demo.png",audioUrl:"abc.mp3"}},
            Buildfire: Buildfire
        });
    }));


    describe('Unit : units should be Defined', function () {
        it('it should pass if WidgetHome is defined', function () {
            expect(WidgetHome).not.toBeUndefined();
        });
        it('it should pass if Buildfire is defined', function () {
            expect(Buildfire).not.toBeUndefined();
        });
    });
    describe('Unit : playTrack method should be Defined', function () {
        it('it should pass if playTrack is defined', function () {
            expect(WidgetHome.playTrack).not.toBeUndefined();
        });
        it('it should pass if playTrack method calling', function () {
            WidgetHome.currentTrack={title:'track1',url:'track1.mp3'};
            WidgetHome.playing=false;
            WidgetHome.playTrack();
            rootScope.$digest();
            expect(WidgetHome.playing).toEqual(true);
        });
        it('it should pass if playTrack method calling if track is paused', function () {
            WidgetHome.currentTrack={title:'track1',url:'track1.mp3'};
            WidgetHome.playing=false;
            WidgetHome.paused=true;
            WidgetHome.playTrack();
            rootScope.$digest();
            expect(WidgetHome.playing).toEqual(true);
        });
    });
    describe('Unit : playlistPlay method should be Defined', function () {
        it('it should pass if playTrack is defined', function () {
            expect(WidgetHome.playlistPlay).not.toBeUndefined();
        });
        it('it should pass if playlistPlay method calling', function () {
            WidgetHome.currentTrack={title:'track1',url:'track1.mp3'};
            WidgetHome.playing=false;
            WidgetHome.playlistPlay({title:'track1',url:'track1.mp3'});
            rootScope.$digest();
            expect(WidgetHome.playing).toEqual(true);
        });
    });
    describe('Unit : pauseTrack method should be Defined', function () {
        it('it should pass if pauseTrack is defined', function () {
            expect(WidgetHome.pauseTrack).not.toBeUndefined();
        });
        it('it should pass if pauseTrack method calling', function () {
            WidgetHome.currentTrack={title:'track1',url:'track1.mp3'};
            WidgetHome.playing=true;
            WidgetHome.pauseTrack({title:'track1',url:'track1.mp3'});
            rootScope.$digest();
            expect(WidgetHome.playing).toEqual(false);
        });
    });
    describe('Unit : playlistPause method should be Defined', function () {
        it('it should pass if playlistPause is defined', function () {
            expect(WidgetHome.playlistPause).not.toBeUndefined();
        });
        it('it should pass if playlistPause method calling', function () {
            WidgetHome.currentTrack={title:'track1',url:'track1.mp3'};
            WidgetHome.playing=true;
            WidgetHome.playlistPause({title:'track1',url:'track1.mp3'});
            rootScope.$digest();
            expect(WidgetHome.playing).toEqual(false);
        });
    });
    describe('Unit : forward method should be Defined', function () {
        it('it should pass if forward is defined', function () {
            expect(WidgetHome.forward).not.toBeUndefined();
        });
        it('it should pass if forward method calling', function () {
            WidgetHome.currentTrack={title:'track1',url:'track1.mp3',duration:20};
            WidgetHome.currentTime=5;
            WidgetHome.forward();
            rootScope.$digest();
            expect(WidgetHome.currentTime).toEqual(5);
        });
        it('it should pass if forward method calling', function () {
            WidgetHome.currentTrack={title:'track1',url:'track1.mp3',duration:5};
            WidgetHome.currentTime=5;
            WidgetHome.forward();
            rootScope.$digest();
            expect(WidgetHome.currentTime).toEqual(5);
        });
    });
    describe('Unit : backward method should be Defined', function () {
        it('it should pass if backward is defined', function () {
            expect(WidgetHome.backward).not.toBeUndefined();
        });
        it('it should pass if forward method calling', function () {
            WidgetHome.currentTrack={title:'track1',url:'track1.mp3',duration:20};
            WidgetHome.currentTime=5;
            WidgetHome.backward();
            rootScope.$digest();
            expect(WidgetHome.currentTime).toEqual(5);
        });
        it('it should pass if forward method calling', function () {
            WidgetHome.currentTrack={title:'track1',url:'track1.mp3',duration:20};
            WidgetHome.currentTime=7;
            WidgetHome.backward();
            rootScope.$digest();
            expect(WidgetHome.currentTime).toEqual(7);
        });
    });
    describe('Unit : addToPlaylist method should be Defined', function () {
        it('it should pass if addToPlaylist is defined', function () {
            expect(WidgetHome.addToPlaylist).not.toBeUndefined();
        });
        it('it should pass if addToPlaylist method calling', function () {
            WidgetHome.currentTrack={title:'track1',url:'track1.mp3',duration:20};
            WidgetHome.addToPlaylist();
            rootScope.$digest();
        });
    });
    describe('Unit : shufflePlaylist method should be Defined', function () {
        it('it should pass if forward is defined', function () {
            expect(WidgetHome.shufflePlaylist).not.toBeUndefined();
        });
        it('it should pass if shufflePlaylist method calling', function () {
            WidgetHome.settings={shufflePlaylist:true};
            WidgetHome.shufflePlaylist();
            rootScope.$digest();
            expect(WidgetHome.settings.shufflePlaylist).toEqual(false);
        });
    });
    describe('Unit : loopPlaylist method should be Defined', function () {
        it('it should pass if loopPlaylist is defined', function () {
            expect(WidgetHome.loopPlaylist).not.toBeUndefined();
        });
        it('it should pass if loopPlaylist method calling', function () {
            WidgetHome.settings={loopPlaylist:true};
            WidgetHome.loopPlaylist();
            rootScope.$digest();
            expect(WidgetHome.settings.loopPlaylist).toEqual(false);
        });
    });
    describe('Unit : changeVolume method should be Defined', function () {
        it('it should pass if changeVolume is defined', function () {
            expect(WidgetHome.changeVolume).not.toBeUndefined();
        });
        it('it should pass if changeVolume method calling', function () {
            WidgetHome.changeVolume(50);
            rootScope.$digest();
        });
    });
    describe('Unit : changeTime method should be Defined', function () {
        it('it should pass if changeTime is defined', function () {
            expect(WidgetHome.changeTime).not.toBeUndefined();
        });
        it('it should pass if changeTime method calling', function () {
            WidgetHome.changeTime(50);
            rootScope.$digest();
        });
    });
    describe('Unit : getSettings method should be Defined', function () {
        it('it should pass if getSettings is defined', function () {
            expect(WidgetHome.getSettings).not.toBeUndefined();
        });
        it('it should pass if getSettings method calling', function () {
            WidgetHome.getSettings(false);
            rootScope.$digest();
        });
    });
    describe('Unit : removeTrackFromPlayList method should be Defined', function () {
        it('it should pass if removeTrackFromPlayList is defined', function () {
            expect(WidgetHome.removeTrackFromPlayList).not.toBeUndefined();
        });
        it('it should pass if removeTrackFromPlayList method calling', function () {
            WidgetHome.removeTrackFromPlayList(50);
            rootScope.$digest();
        });
    });
    describe('Unit : removeFromPlaylist method should be Defined', function () {
        it('it should pass if removeFromPlaylist is defined', function () {
            expect(WidgetHome.removeFromPlaylist).not.toBeUndefined();
        });
        it('it should pass if removeFromPlaylist method calling', function () {
            WidgetHome.playList=[{title:'track1',url:'track1.mp3'}];
            WidgetHome.removeFromPlaylist({title:'track1',url:'track1.mp3'});
            rootScope.$digest();
        });
    });
    describe('Unit : setSettings method should be Defined', function () {
        it('it should pass if setSettings is defined', function () {
            expect(WidgetHome.setSettings).not.toBeUndefined();
        });
        it('it should pass if setSettings method calling', function () {
            WidgetHome.setSettings({loopPlaylist:true, shufflePlaylist:true});
            rootScope.$digest();
        });
    });
    describe('Unit : addEvents method should be Defined', function () {
        it('it should pass if addEvents is defined', function () {
            expect(WidgetHome.addEvents).not.toBeUndefined();
        });
        it('it should pass if addEvents method calling', function () {
            WidgetHome.addEvents({},{},true,{});
            rootScope.$digest();
        });
    });
    describe('Unit : openMoreInfoOverlay method should be Defined', function () {
        it('it should pass if addEvents method calling', function () {
            WidgetHome.openMoreInfoOverlay();
            WidgetHome.closeSettingsOverlay();
            WidgetHome.closePlayListOverlay();
            WidgetHome.closeMoreInfoOverlay();
            rootScope.$digest();
        });
    });

});