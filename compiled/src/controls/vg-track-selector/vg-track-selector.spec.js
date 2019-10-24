"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_track_selector_1 = require("./vg-track-selector");
var vg_api_1 = require("../../core/services/vg-api");
describe('Track Selector control', function () {
    var vgTrackSelector;
    function createSubtitleTrack(label, srclang, isDefault) {
        var track = {};
        track.tagName = 'TRACK';
        track.kind = 'subtitles';
        track.label = label;
        track.srclang = srclang;
        track.default = isDefault;
        return track;
    }
    beforeEach(function () {
        var ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                }
            }
        };
        vgTrackSelector = new vg_track_selector_1.VgTrackSelector(ref, new vg_api_1.VgAPI());
    });
    describe('onPlayerReady', function () {
        beforeEach(function () {
            vgTrackSelector.API.getMasterMedia = function () {
                return {
                    elem: {
                        children: [
                            createSubtitleTrack('English', 'en', false),
                            createSubtitleTrack('Español', 'es', true),
                            {},
                            {},
                            {}
                        ]
                    }
                };
            };
        });
        it('Should show subtitles tracks only', function () {
            vgTrackSelector.onPlayerReady();
            expect(vgTrackSelector.tracks.length).toBe(3); // 2 subs + 'Off'
        });
        it('Should set the selected option', function () {
            vgTrackSelector.onPlayerReady();
            expect(vgTrackSelector.tracks.filter(function (item) { return item.selected === true; })[0].label).toBe('Español');
        });
        it('Should have an Off option', function () {
            vgTrackSelector.onPlayerReady();
            expect(vgTrackSelector.tracks.filter(function (item) { return item.label === 'Off'; }).length).toBe(1);
        });
        it('Should set Off option as selected when there is no default track', function () {
            vgTrackSelector.API.getMasterMedia = function () {
                return {
                    elem: {
                        children: [
                            createSubtitleTrack('English', 'en', false),
                            createSubtitleTrack('Español', 'es', false)
                        ]
                    }
                };
            };
            vgTrackSelector.onPlayerReady();
            expect(vgTrackSelector.tracks.filter(function (item) { return item.selected === true; })[0].label).toBe('Off');
        });
    });
    describe('selectTrack', function () {
        beforeEach(function () {
            spyOn(vgTrackSelector.API, 'getMasterMedia').and.returnValue({
                elem: {
                    textTracks: [
                        { mode: 'showing', language: 'en' },
                        { mode: 'hidden', language: 'es' }
                    ]
                }
            });
        });
        it('Should select by track id', function () {
            vgTrackSelector.selectTrack('es');
            expect(vgTrackSelector.API.getMasterMedia().elem.textTracks.filter(function (item) { return item.mode === 'showing'; })[0].language).toBe('es');
        });
        it('Should select Off when track id is null', function () {
            vgTrackSelector.selectTrack(null);
            expect(vgTrackSelector.API.getMasterMedia().elem.textTracks.filter(function (item) { return item.mode === 'showing'; }).length).toBe(0);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdHJhY2stc2VsZWN0b3Iuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9scy92Zy10cmFjay1zZWxlY3Rvci92Zy10cmFjay1zZWxlY3Rvci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQXNEO0FBQ3RELHFEQUFtRDtBQUduRCxRQUFRLENBQUMsd0JBQXdCLEVBQUU7SUFDakMsSUFBSSxlQUFnQyxDQUFDO0lBRXJDLFNBQVMsbUJBQW1CLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxTQUFrQjtRQUM3RSxJQUFNLEtBQUssR0FBcUIsRUFBc0IsQ0FBQztRQUN0RCxLQUFhLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNqQyxLQUFLLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUN6QixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNwQixLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN4QixLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUMxQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVLENBQUM7UUFDVCxJQUFNLEdBQUcsR0FBZTtZQUN0QixhQUFhLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFLFVBQUMsSUFBSTtvQkFDakIsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQzthQUNGO1NBQ0YsQ0FBQztRQUNGLGVBQWUsR0FBRyxJQUFJLG1DQUFlLENBQUMsR0FBRyxFQUFFLElBQUksY0FBSyxFQUFFLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIsVUFBVSxDQUFDO1lBQ1QsZUFBZSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUc7Z0JBQ25DLE9BQU87b0JBQ0wsSUFBSSxFQUFFO3dCQUNKLFFBQVEsRUFBRTs0QkFDUixtQkFBbUIsQ0FBQyxTQUFTLEVBQUUs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QUNsQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FDZCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHlDQUF5QyxFQUFFO1lBQzVDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUNILGVBQWUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ2xFLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQXZCLENBQXVCLENBQ2xDLENBQUMsTUFBTSxDQUNULENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmdUcmFja1NlbGVjdG9yIH0gZnJvbSAnLi92Zy10cmFjay1zZWxlY3Rvcic7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVzY3JpYmUoJ1RyYWNrIFNlbGVjdG9yIGNvbnRyb2wnLCAoKSA9PiB7XG4gIGxldCB2Z1RyYWNrU2VsZWN0b3I6IFZnVHJhY2tTZWxlY3RvcjtcblxuICBmdW5jdGlvbiBjcmVhdGVTdWJ0aXRsZVRyYWNrKGxhYmVsOiBzdHJpbmcsIHNyY2xhbmc6IHN0cmluZywgaXNEZWZhdWx0OiBib29sZWFuKSB7XG4gICAgY29uc3QgdHJhY2s6IEhUTUxUcmFja0VsZW1lbnQgPSB7fSBhcyBIVE1MVHJhY2tFbGVtZW50O1xuICAgICh0cmFjayBhcyBhbnkpLnRhZ05hbWUgPSAnVFJBQ0snO1xuICAgIHRyYWNrLmtpbmQgPSAnc3VidGl0bGVzJztcbiAgICB0cmFjay5sYWJlbCA9IGxhYmVsO1xuICAgIHRyYWNrLnNyY2xhbmcgPSBzcmNsYW5nO1xuICAgIHRyYWNrLmRlZmF1bHQgPSBpc0RlZmF1bHQ7XG4gICAgcmV0dXJuIHRyYWNrO1xuICB9XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgY29uc3QgcmVmOiBFbGVtZW50UmVmID0ge1xuICAgICAgbmF0aXZlRWxlbWVudDoge1xuICAgICAgICBnZXRBdHRyaWJ1dGU6IChuYW1lKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZnVHJhY2tTZWxlY3RvciA9IG5ldyBWZ1RyYWNrU2VsZWN0b3IocmVmLCBuZXcgVmdBUEkoKSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdvblBsYXllclJlYWR5JywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgdmdUcmFja1NlbGVjdG9yLkFQSS5nZXRNYXN0ZXJNZWRpYSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBlbGVtOiB7XG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICBjcmVhdGVTdWJ0aXRsZVRyYWNrKCdFbmdsaXNoJywgJ2VuJywgZmFsc2UpLFxuICAgICAgICAgICAgICBjcmVhdGVTdWJ0aXRsZVRyYWNrKCdFc3Bhw7FvbCcsICdlcycsIHRydWUpLFxuICAgICAgICAgICAgICB7fSBhcyBIVE1MVHJhY2tFbGVtZW50LFxuICAgICAgICAgICAgICB7fSBhcyBIVE1MVHJhY2tFbGVtZW50LFxuICAgICAgICAgICAgICB7fSBhcyBIVE1MVHJhY2tFbGVtZW50XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9IGFzIGFueTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgaXQoJ1Nob3VsZCBzaG93IHN1YnRpdGxlcyB0cmFja3Mgb25seScsICgpID0+IHtcbiAgICAgIHZnVHJhY2tTZWxlY3Rvci5vblBsYXllclJlYWR5KCk7XG4gICAgICBleHBlY3QodmdUcmFja1NlbGVjdG9yLnRyYWNrcy5sZW5ndGgpLnRvQmUoMyk7IC8vIDIgc3VicyArICdPZmYnXG4gICAgfSk7XG4gICAgaXQoJ1Nob3VsZCBzZXQgdGhlIHNlbGVjdGVkIG9wdGlvbicsICgpID0+IHtcbiAgICAgIHZnVHJhY2tTZWxlY3Rvci5vblBsYXllclJlYWR5KCk7XG4gICAgICBleHBlY3QodmdUcmFja1NlbGVjdG9yLnRyYWNrcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uc2VsZWN0ZWQgPT09IHRydWUpWzBdLmxhYmVsKS50b0JlKFxuICAgICAgICAnRXNwYcOxb2wnXG4gICAgICApO1xuICAgIH0pO1xuICAgIGl0KCdTaG91bGQgaGF2ZSBhbiBPZmYgb3B0aW9uJywgKCkgPT4ge1xuICAgICAgdmdUcmFja1NlbGVjdG9yLm9uUGxheWVyUmVhZHkoKTtcbiAgICAgIGV4cGVjdCh2Z1RyYWNrU2VsZWN0b3IudHJhY2tzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5sYWJlbCA9PT0gJ09mZicpLmxlbmd0aCkudG9CZSgxKTtcbiAgICB9KTtcbiAgICBpdCgnU2hvdWxkIHNldCBPZmYgb3B0aW9uIGFzIHNlbGVjdGVkIHdoZW4gdGhlcmUgaXMgbm8gZGVmYXVsdCB0cmFjaycsICgpID0+IHtcbiAgICAgIHZnVHJhY2tTZWxlY3Rvci5BUEkuZ2V0TWFzdGVyTWVkaWEgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZWxlbToge1xuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgY3JlYXRlU3VidGl0bGVUcmFjaygnRW5nbGlzaCcsICdlbicsIGZhbHNlKSxcbiAgICAgICAgICAgICAgY3JlYXRlU3VidGl0bGVUcmFjaygnRXNwYcOxb2wnLCAnZXMnLCBmYWxzZSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0gYXMgYW55O1xuICAgICAgfTtcbiAgICAgIHZnVHJhY2tTZWxlY3Rvci5vblBsYXllclJlYWR5KCk7XG4gICAgICBleHBlY3QodmdUcmFja1NlbGVjdG9yLnRyYWNrcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uc2VsZWN0ZWQgPT09IHRydWUpWzBdLmxhYmVsKS50b0JlKFxuICAgICAgICAnT2ZmJ1xuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3NlbGVjdFRyYWNrJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgc3B5T24odmdUcmFja1NlbGVjdG9yLkFQSSwgJ2dldE1hc3Rlck1lZGlhJykuYW5kLnJldHVyblZhbHVlKDxhbnk+e1xuICAgICAgICBlbGVtOiB7XG4gICAgICAgICAgdGV4dFRyYWNrczogW1xuICAgICAgICAgICAgeyBtb2RlOiAnc2hvd2luZycsIGxhbmd1YWdlOiAnZW4nIH0sXG4gICAgICAgICAgICB7IG1vZGU6ICdoaWRkZW4nLCBsYW5ndWFnZTogJ2VzJyB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdCgnU2hvdWxkIHNlbGVjdCBieSB0cmFjayBpZCcsICgpID0+IHtcbiAgICAgIHZnVHJhY2tTZWxlY3Rvci5zZWxlY3RUcmFjaygnZXMnKTtcbiAgICAgIGV4cGVjdChcbiAgICAgICAgKHZnVHJhY2tTZWxlY3Rvci5BUEkuZ2V0TWFzdGVyTWVkaWEoKS5lbGVtIGFzIGFueSkudGV4dFRyYWNrcy5maWx0ZXIoXG4gICAgICAgICAgKGl0ZW0pID0+IGl0ZW0ubW9kZSA9PT0gJ3Nob3dpbmcnXG4gICAgICAgIClbMF0ubGFuZ3VhZ2VcbiAgICAgICkudG9CZSgnZXMnKTtcbiAgICB9KTtcbiAgICBpdCgnU2hvdWxkIHNlbGVjdCBPZmYgd2hlbiB0cmFjayBpZCBpcyBudWxsJywgKCkgPT4ge1xuICAgICAgdmdUcmFja1NlbGVjdG9yLnNlbGVjdFRyYWNrKG51bGwpO1xuICAgICAgZXhwZWN0KFxuICAgICAgICAodmdUcmFja1NlbGVjdG9yLkFQSS5nZXRNYXN0ZXJNZWRpYSgpLmVsZW0gYXMgYW55KS50ZXh0VHJhY2tzLmZpbHRlcihcbiAgICAgICAgICAoaXRlbSkgPT4gaXRlbS5tb2RlID09PSAnc2hvd2luZydcbiAgICAgICAgKS5sZW5ndGhcbiAgICAgICkudG9CZSgwKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==