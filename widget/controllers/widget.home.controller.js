'use strict';

(function (angular,window) {
    angular
        .module('MediaPlayerPluginWidget')
        .controller('WidgetHomeCtrl', ['$scope', '$timeout', 'Buildfire',
            '$rootScope', 'Modals',
            function ($scope, $timeout, Buildfire, $rootScope, Modals) {
                console.log('WidgetHomeCtrl Controller Loaded-------------------------------------');
                var WidgetHome = this;
                WidgetHome.currentTime = 0.0;
                WidgetHome.volume = 1;


                /**
                 * audioPlayer is Buildfire.services.media.audioPlayer.
                 */
                var audioPlayer = Buildfire.services.media.audioPlayer;

                audioPlayer.getCurrentTrack(function(track,err){
                    console.log('audioPlayer.getCurrentTrack method called--------------------------------',track,err);
                    if(track){
                        WidgetHome.currentTrack=track;
                        $scope.$digest();
                    }
                });

                audioPlayer.settings.get(function (err, data) {
                    console.log('Got player settings first time-----------------------', err, data);
                    if (data) {
                        WidgetHome.settings = data;
                        if (!$scope.$$phase) {
                            $scope.$digest();
                        }
                    }
                });

                /**
                 * audioPlayer.onEvent callback calls when audioPlayer event fires.
                 */
                audioPlayer.onEvent(function (e) {
                    console.log('Audio Player On Event callback Method--------------------------------------', e);
                    switch (e.event) {
                        case 'timeUpdate':
                            WidgetHome.currentTime = e.data.currentTime;
                            WidgetHome.duration = e.data.duration;
                            break;
                        case 'audioEnded':
                            WidgetHome.playing = false;
                            WidgetHome.paused = false;
                            break;
                        case 'pause':
                            WidgetHome.playing = false;
                            break;
                        case 'next':
                            WidgetHome.currentTrack = e.data.track;
                            WidgetHome.playing = true;
                            break;
                        case 'removeFromPlaylist':
                            Modals.removeTrackModal();
                            WidgetHome.playList = e.data && e.data.newPlaylist && e.data.newPlaylist.tracks;
                            console.log('WidgetHome.playList---------------------in removeFromPlaylist---', WidgetHome.playList);
                            break;

                    }
                    $scope.$digest();
                });

                /**
                 * Player related method and variables
                 */
                WidgetHome.playTrack = function () {
                    WidgetHome.playing = true;
                    WidgetHome.currentTrack.isPlaying = true;
                    if (WidgetHome.paused) {
                        audioPlayer.play();
                    } else {
                        audioPlayer.play(WidgetHome.currentTrack);
                    }
                };
                WidgetHome.playlistPlay = function (track) {
                    WidgetHome.currentTrack = track;
                    console.log('PlayList Play ---------------Track is played', track);
                    WidgetHome.playing = true;
                    if (track) {
                        audioPlayer.play(track);
                        track.playing = true;
                    }
                    WidgetHome.getFromPlaylist();
                };
                WidgetHome.pauseTrack = function () {
                    WidgetHome.playing = false;
                    WidgetHome.paused = true;
                    WidgetHome.currentTrack.isPlaying = false;
                    audioPlayer.pause();
                };
                WidgetHome.playlistPause = function (track) {
                    track.playing = false;
                    WidgetHome.playing = false;
                    WidgetHome.paused = true;
                    audioPlayer.pause();
                };
                WidgetHome.forward = function () {
                    if (WidgetHome.currentTime + 5 >= WidgetHome.currentTrack.duration)
                        audioPlayer.setTime(WidgetHome.currentTrack.duration);
                    else
                        audioPlayer.setTime(WidgetHome.currentTime + 5);
                };

                WidgetHome.backward = function () {
                    if (WidgetHome.currentTime - 5 > 0)
                        audioPlayer.setTime(WidgetHome.currentTime - 5);
                    else
                        audioPlayer.setTime(0);
                };
                WidgetHome.shufflePlaylist = function () {
                    console.log('WidgetHome settings in shuffle---------------------', WidgetHome.settings);
                    if (WidgetHome.settings) {
                        WidgetHome.settings.shufflePlaylist = !WidgetHome.settings.shufflePlaylist;
                        audioPlayer.settings.set(WidgetHome.settings);
                    }
                };
                WidgetHome.changeVolume = function (volume) {
                    console.log('Volume----------------------', volume);
                    //audioPlayer.setVolume(volume);
                    audioPlayer.settings.get(function (err, setting) {
                        console.log('Settings------------------', setting);
                        if (setting) {
                            setting.volume = volume;
                            audioPlayer.settings.set(setting);
                        }
                        else {
                            audioPlayer.settings.set({volume: volume});
                        }
                    });

                };
                WidgetHome.loopPlaylist = function () {
                    console.log('WidgetHome settings in Loop Playlist---------------------', WidgetHome.settings);
                    if (WidgetHome.settings) {
                        WidgetHome.settings.loopPlaylist = !WidgetHome.settings.loopPlaylist;
                        audioPlayer.settings.set(WidgetHome.settings);
                    }
                };
                WidgetHome.addToPlaylist = function () {
                    console.log('AddToPlaylist called-------------------------------');
                    audioPlayer.addToPlaylist(WidgetHome.currentTrack);
                };
                WidgetHome.removeFromPlaylist = function (track) {
                    console.log('removeFromPlaylist called-------------------------------');
                    if (WidgetHome.playList) {
                        var trackIndex = 0;
                        WidgetHome.playList.some(function (val, index) {
                            if ((val.url == track.url) && (trackIndex == 0)) {
                                audioPlayer.removeFromPlaylist(index);
                                trackIndex++;
                            }
                            return (val.url == track.url);

                        });
                        console.log('indexes------------track Index----------------------track==========', trackIndex);
                    }
                };
                WidgetHome.removeTrackFromPlayList = function (index) {
                    audioPlayer.removeFromPlaylist(index);
                };
                WidgetHome.getFromPlaylist = function () {
                    var trackIndex = 0,
                        trackIndex1 = 0;
                    audioPlayer.getPlaylist(function (err, data) {
                        console.log('Callback---------getList--------------', err, data);
                        if (data && data.tracks) {
                            WidgetHome.playList = data.tracks;
                            $scope.$digest();
                        }
                    });
                    WidgetHome.openMoreInfo = false;
                    WidgetHome.openPlaylist = true;
                };
                WidgetHome.changeTime = function (time) {
                    console.log('Change time method called---------------------------------', time);
                    audioPlayer.setTime(time);
                };
                WidgetHome.getSettings = function (dontOpen) {
                    if (!dontOpen)
                        WidgetHome.openSettings = true;
                    audioPlayer.settings.get(function (err, data) {
                        console.log('Got player settings-----------------------', err, data);
                        if (data) {
                            WidgetHome.settings = data;
                            if (!$scope.$$phase) {
                                $scope.$digest();
                            }
                        }
                    });
                };
                WidgetHome.setSettings = function (settings) {
                    console.log('Set settings called----------------------', settings);
                    console.log('WidgetHome-------------settings------', WidgetHome.settings);
                    var newSettings = new AudioSettings(settings);
                    audioPlayer.settings.set(newSettings);
                };
                WidgetHome.addEvents = function (e, i, toggle,track) {
                    console.log('addEvent class-------------------calles', e, i, toggle, track);
                    toggle ? track.swiped = true : track.swiped = false;
                };
                WidgetHome.openMoreInfoOverlay = function () {
                    WidgetHome.openMoreInfo = true;
                };
                WidgetHome.closeSettingsOverlay = function () {
                    WidgetHome.openSettings = false;
                };
                WidgetHome.closePlayListOverlay = function () {
                    WidgetHome.openPlaylist = false;
                };
                WidgetHome.closeMoreInfoOverlay = function () {
                    WidgetHome.openMoreInfo = false;
                };

                /**
                 * Track Smaple
                 * @param title
                 * @param url
                 * @param image
                 * @param album
                 * @param artist
                 * @constructor
                 */

                function Track(title, url, image, album, artist) {
                    this.title = title;
                    this.url = url;
                    this.image = image;
                    this.album = album;
                    this.artist = artist;
                    this.startAt = 0; // where to begin playing
                    this.lastPosition = 0; // last played to
                }

                /**
                 * AudioSettings sample
                 * @param autoPlayNext
                 * @param loop
                 * @param autoJumpToLastPosition
                 * @param shufflePlaylist
                 * @constructor
                 */
                function AudioSettings(settings) {
                    this.autoPlayNext = settings.autoPlayNext; // once a track is finished playing go to the next track in the play list and play it
                    this.loopPlaylist = settings.loopPlaylist; // once the end of the playlist has been reached start over again
                    this.autoJumpToLastPosition = settings.autoJumpToLastPosition; //If a track has [lastPosition] use it to start playing the audio from there
                    this.shufflePlaylist = settings.shufflePlaylist;// shuffle the playlist
                }



                WidgetHome.playlistPlayPause = function (track) {
                    if (track.playing)
                        WidgetHome.playlistPause(track);
                    else
                        WidgetHome.playlistPlay(track);
                };

            }]);
})(window.angular,window);