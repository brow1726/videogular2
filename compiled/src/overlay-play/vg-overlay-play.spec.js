"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_overlay_play_1 = require("./vg-overlay-play");
var vg_api_1 = require("../core/services/vg-api");
var vg_states_1 = require("../core/states/vg-states");
var vg_fullscreen_api_1 = require("../core/services/vg-fullscreen-api");
describe('Videogular Player', function () {
    var overlayPlay;
    var ref;
    var api;
    var fsAPI;
    var controlsHidden;
    beforeEach(function () {
        ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                }
            }
        };
        controlsHidden = {
            isHidden: {
                subscribe: function () { }
            }
        };
        api = new vg_api_1.VgAPI();
        fsAPI = new vg_fullscreen_api_1.VgFullscreenAPI();
        overlayPlay = new vg_overlay_play_1.VgOverlayPlay(ref, api, fsAPI, controlsHidden);
    });
    it('Should get media by id on init', function () {
        spyOn(api, 'getMediaById').and.returnValue({
            subscriptions: {
                bufferDetected: { subscribe: jasmine.createSpy('bufferDetected') }
            }
        });
        overlayPlay.vgFor = 'test';
        overlayPlay.onPlayerReady();
        expect(api.getMediaById).toHaveBeenCalledWith('test');
        expect(overlayPlay.target.subscriptions.bufferDetected.subscribe).toHaveBeenCalled();
    });
    describe('onClick', function () {
        beforeEach(function () {
            overlayPlay.target = {
                play: function () { },
                pause: function () { }
            };
        });
        it('current state play should set target to pause', function () {
            spyOn(overlayPlay, 'getState').and.callFake(function () {
                return vg_states_1.VgStates.VG_PLAYING;
            });
            spyOn(overlayPlay.target, 'pause');
            overlayPlay.onClick();
            expect(overlayPlay.getState).toHaveBeenCalled();
            expect(overlayPlay.target.pause).toHaveBeenCalled();
        });
        it('current state pause should set target to play', function () {
            spyOn(overlayPlay, 'getState').and.callFake(function () {
                return vg_states_1.VgStates.VG_PAUSED;
            });
            spyOn(overlayPlay.target, 'play');
            overlayPlay.onClick();
            expect(overlayPlay.getState).toHaveBeenCalled();
            expect(overlayPlay.target.play).toHaveBeenCalled();
        });
    });
    describe('getState', function () {
        beforeEach(function () {
            overlayPlay.target = {
                state: null
            };
        });
        it('if only one state returns that state', function () {
            overlayPlay.target.state = vg_states_1.VgStates.VG_PAUSED;
            expect(overlayPlay.getState()).toEqual(vg_states_1.VgStates.VG_PAUSED);
        });
        it('if more than one target should return pause if all of them are pause', function () {
            overlayPlay.target.state = [
                vg_states_1.VgStates.VG_PAUSED,
                vg_states_1.VgStates.VG_PAUSED,
                vg_states_1.VgStates.VG_PAUSED,
                vg_states_1.VgStates.VG_PAUSED
            ];
            expect(overlayPlay.getState()).toEqual(vg_states_1.VgStates.VG_PAUSED);
        });
        it('if more than one target should return play if any of them is play', function () {
            overlayPlay.target.state = [
                vg_states_1.VgStates.VG_PAUSED,
                vg_states_1.VgStates.VG_PLAYING,
                vg_states_1.VgStates.VG_PAUSED,
                vg_states_1.VgStates.VG_PAUSED
            ];
            expect(overlayPlay.getState()).toEqual(vg_states_1.VgStates.VG_PLAYING);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctb3ZlcmxheS1wbGF5LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3ZlcmxheS1wbGF5L3ZnLW92ZXJsYXktcGxheS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWtEO0FBQ2xELGtEQUFnRDtBQUVoRCxzREFBb0Q7QUFDcEQsd0VBQXFFO0FBR3JFLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtJQUM1QixJQUFJLFdBQTBCLENBQUM7SUFDL0IsSUFBSSxHQUFlLENBQUM7SUFDcEIsSUFBSSxHQUFVLENBQUM7SUFDZixJQUFJLEtBQXNCLENBQUM7SUFDM0IsSUFBSSxjQUFnQyxDQUFDO0lBRXJDLFVBQVUsQ0FBQztRQUNULEdBQUcsR0FBRztZQUNKLGFBQWEsRUFBRTtnQkFDYixZQUFZLEVBQUUsVUFBQyxJQUFJO29CQUNqQixPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO2FBQ0Y7U0FDRixDQUFDO1FBRUYsY0FBYyxHQUFHO1lBQ2YsUUFBUSxFQUFFO2dCQUNSLFNBQVMsRUFBRSxjQUFPLENBQUM7YUFDcEI7U0FDa0IsQ0FBQztRQUV0QixHQUFHLEdBQUcsSUFBSSxjQUFLLEVBQUUsQ0FBQztRQUNsQixLQUFLLEdBQUcsSUFBSSxtQ0FBZSxFQUFFLENBQUM7UUFDOUIsV0FBVyxHQUFHLElBQUksK0JBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNuRSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUNuQyxLQUFLLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQU07WUFDOUMsYUFBYSxFQUFFO2dCQUNiLGNBQWMsRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7YUFDbkU7U0FDRixDQUFDLENBQUM7UUFFSCxX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LFNBQVM7Z0JBQ2xCLG9CQUFRLENBQUMsVUFBVTtnQkFDbkIsb0JBQVEsQ0FBQyxTQUFTO2dCQUNsQixvQkFBUSxDQUFDLFNBQVM7YUFDbkIsQ0FBQztZQUVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZ092ZXJsYXlQbGF5IH0gZnJvbSAnLi92Zy1vdmVybGF5LXBsYXknO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZ1N0YXRlcyB9IGZyb20gJy4uL2NvcmUvc3RhdGVzL3ZnLXN0YXRlcyc7XG5pbXBvcnQgeyBWZ0Z1bGxzY3JlZW5BUEkgfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL3ZnLWZ1bGxzY3JlZW4tYXBpJztcbmltcG9ydCB7IFZnQ29udHJvbHNIaWRkZW4gfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL3ZnLWNvbnRyb2xzLWhpZGRlbic7XG5cbmRlc2NyaWJlKCdWaWRlb2d1bGFyIFBsYXllcicsICgpID0+IHtcbiAgbGV0IG92ZXJsYXlQbGF5OiBWZ092ZXJsYXlQbGF5O1xuICBsZXQgcmVmOiBFbGVtZW50UmVmO1xuICBsZXQgYXBpOiBWZ0FQSTtcbiAgbGV0IGZzQVBJOiBWZ0Z1bGxzY3JlZW5BUEk7XG4gIGxldCBjb250cm9sc0hpZGRlbjogVmdDb250cm9sc0hpZGRlbjtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICByZWYgPSB7XG4gICAgICBuYXRpdmVFbGVtZW50OiB7XG4gICAgICAgIGdldEF0dHJpYnV0ZTogKG5hbWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb250cm9sc0hpZGRlbiA9IHtcbiAgICAgIGlzSGlkZGVuOiB7XG4gICAgICAgIHN1YnNjcmliZTogKCkgPT4ge31cbiAgICAgIH1cbiAgICB9IGFzIFZnQ29udHJvbHNIaWRkZW47XG5cbiAgICBhcGkgPSBuZXcgVmdBUEkoKTtcbiAgICBmc0FQSSA9IG5ldyBWZ0Z1bGxzY3JlZW5BUEkoKTtcbiAgICBvdmVybGF5UGxheSA9IG5ldyBWZ092ZXJsYXlQbGF5KHJlZiwgYXBpLCBmc0FQSSwgY29udHJvbHNIaWRkZW4pO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIGdldCBtZWRpYSBieSBpZCBvbiBpbml0JywgKCkgPT4ge1xuICAgIHNweU9uKGFwaSwgJ2dldE1lZGlhQnlJZCcpLmFuZC5yZXR1cm5WYWx1ZSg8YW55PntcbiAgICAgIHN1YnNjcmlwdGlvbnM6IHtcbiAgICAgICAgYnVmZmVyRGV0ZWN0ZWQ6IHsgc3Vic2NyaWJlOiBqYXNtaW5lLmNyZWF0ZVNweSgnYnVmZmVyRGV0ZWN0ZWQnKSB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBvdmVybGF5UGxheS52Z0ZvciA9ICd0ZXN0JztcbiAgICBvdmVybGF5UGxheS5vblBsYXllclJlYWR5KCk7XG5cbiAgICBleHBlY3QoYXBpLmdldE1lZGlhQnlJZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3Rlc3QnKTtcbiAgICBleHBlY3Qob3ZlcmxheVBsYXkudGFyZ2V0LnN1YnNjcmlwdGlvbnMuYnVmZmVyRGV0ZWN0ZWQuc3Vic2NyaWJlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdvbkNsaWNrJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgb3ZlcmxheVBsYXkudGFyZ2V0ID0ge1xuICAgICAgICBwbGF5OiAoKSA9PiB7fSxcbiAgICAgICAgcGF1c2U6ICgpID0+IHt9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgaXQoJ2N1cnJlbnQgc3RhdGUgcGxheSBzaG91bGQgc2V0IHRhcmdldCB0byBwYXVzZScsICgpID0+IHtcbiAgICAgIHNweU9uKG92ZXJsYXlQbGF5LCAnZ2V0U3RhdGUnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICByZXR1cm4gVmdTdGF0ZXMuVkdfUExBWUlORztcbiAgICAgIH0pO1xuICAgICAgc3B5T24ob3ZlcmxheVBsYXkudGFyZ2V0LCAncGF1c2UnKTtcblxuICAgICAgb3ZlcmxheVBsYXkub25DbGljaygpO1xuXG4gICAgICBleHBlY3Qob3ZlcmxheVBsYXkuZ2V0U3RhdGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIGV4cGVjdChvdmVybGF5UGxheS50YXJnZXQucGF1c2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdjdXJyZW50IHN0YXRlIHBhdXNlIHNob3VsZCBzZXQgdGFyZ2V0IHRvIHBsYXknLCAoKSA9PiB7XG4gICAgICBzcHlPbihvdmVybGF5UGxheSwgJ2dldFN0YXRlJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIFZnU3RhdGVzLlZHX1BBVVNFRDtcbiAgICAgIH0pO1xuICAgICAgc3B5T24ob3ZlcmxheVBsYXkudGFyZ2V0LCAncGxheScpO1xuXG4gICAgICBvdmVybGF5UGxheS5vbkNsaWNrKCk7XG5cbiAgICAgIGV4cGVjdChvdmVybGF5UGxheS5nZXRTdGF0ZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgZXhwZWN0KG92ZXJsYXlQbGF5LnRhcmdldC5wbGF5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRTdGF0ZScsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG92ZXJsYXlQbGF5LnRhcmdldCA9IHtcbiAgICAgICAgc3RhdGU6IG51bGxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBpdCgnaWYgb25seSBvbmUgc3RhdGUgcmV0dXJucyB0aGF0IHN0YXRlJywgKCkgPT4ge1xuICAgICAgb3ZlcmxheVBsYXkudGFyZ2V0LnN0YXRlID0gVmdTdGF0ZXMuVkdfUEFVU0VEO1xuXG4gICAgICBleHBlY3Qob3ZlcmxheVBsYXkuZ2V0U3RhdGUoKSkudG9FcXVhbChWZ1N0YXRlcy5WR19QQVVTRUQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2lmIG1vcmUgdGhhbiBvbmUgdGFyZ2V0IHNob3VsZCByZXR1cm4gcGF1c2UgaWYgYWxsIG9mIHRoZW0gYXJlIHBhdXNlJywgKCkgPT4ge1xuICAgICAgb3ZlcmxheVBsYXkudGFyZ2V0LnN0YXRlID0gW1xuICAgICAgICBWZ1N0YXRlcy5WR19QQVVTRUQsXG4gICAgICAgIFZnU3RhdGVzLlZHX1BBVVNFRCxcbiAgICAgICAgVmdTdGF0ZXMuVkdfUEFVU0VELFxuICAgICAgICBWZ1N0YXRlcy5WR19QQVVTRURcbiAgICAgIF07XG5cbiAgICAgIGV4cGVjdChvdmVybGF5UGxheS5nZXRTdGF0ZSgpKS50b0VxdWFsKFZnU3RhdGVzLlZHX1BBVVNFRCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaWYgbW9yZSB0aGFuIG9uZSB0YXJnZXQgc2hvdWxkIHJldHVybiBwbGF5IGlmIGFueSBvZiB0aGVtIGlzIHBsYXknLCAoKSA9PiB7XG4gICAgICBvdmVybGF5UGxheS50YXJnZXQuc3RhdGUgPSBbXG4gICAgICAgIFZnU3RhdGVzLlZHX1BBVVNFRCxcbiAgICAgICAgVmdTdGF0ZXMuVkdfUExBWUlORyxcbiAgICAgICAgVmdTdGF0ZXMuVkdfUEFVU0VELFxuICAgICAgICBWZ1N0YXRlcy5WR19QQVVTRURcbiAgICAgIF07XG5cbiAgICAgIGV4cGVjdChvdmVybGF5UGxheS5nZXRTdGF0ZSgpKS50b0VxdWFsKFZnU3RhdGVzLlZHX1BMQVlJTkcpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19