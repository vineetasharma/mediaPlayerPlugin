describe('MediaPlayerModals:', function () {
    var $modal, $q;
    beforeEach(module('MediaPlayerModals'));
    beforeEach(inject(function ($injector) {
        $q = $injector.get('$q');
    }));

    describe('Modals service', function () {
        var Modals;
        $modal = jasmine.createSpyObj('$modal', ['open']);
        beforeEach(inject(
            function (_Modals_) {
                Modals = _Modals_;
            }));
        it('Modals should exists', function () {
            expect(Modals).toBeDefined();
        });
        it('Modals.removePopupModal should exists', function () {
            expect(Modals.removeTrackModal).toBeDefined();
        });
        it('when $modal.open invoked by removePopupModal and clicked Ok', function () {
            $modal.open.and.callFake(function (obj) {
                var deferred = $q.defer();
                obj.resolve.Info();
                deferred.resolve({});
                return {
                    result: deferred.promise
                };
            });
            Modals.removeTrackModal({
                templateUrl: 'templates/modals/remove-track-modal.html',
                controller: 'RemoveTrackModalPopupCtrl',
                controllerAs: 'RemoveTrackPopup',
                size: 'sm'
            });
        });
    });

    describe('Modals: RemoveTrackModalPopupCtrl Controller', function () {
        var scope, $modalInstance, Info, spy,RemoveTrackPopup;
        beforeEach(inject(function ($controller, _$rootScope_, _$modal_) {
                scope = _$rootScope_.$new();
                $modalInstance = {                    // Create a mock object using spies
                    close: jasmine.createSpy('modalInstance.close'),
                    dismiss: jasmine.createSpy('modalInstance.dismiss'),
                    result: {
                        then: jasmine.createSpy('modalInstance.result.then')
                    }
                };
                Info = {};
                RemoveTrackPopup = $controller('RemoveTrackModalPopupCtrl', {
                    $scope: scope,
                    $modalInstance: $modalInstance //_$modal_.op
                });
            })
        );
        it('RemovePopup should exists', function () {
            expect(RemoveTrackPopup.ok).toBeDefined();
        });
        it('scope.ok should close modalInstance', function () {
            RemoveTrackPopup.ok();
            //expect(RemoveTrackPopup.close).toHaveBeenCalledWith('yes');
        });
    });
});
