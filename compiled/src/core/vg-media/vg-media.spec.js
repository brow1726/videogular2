"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_media_1 = require("./vg-media");
var vg_api_1 = require("../services/vg-api");
var vg_states_1 = require("../states/vg-states");
var vg_media_element_1 = require("./vg-media-element");
var testing_1 = require("@angular/core/testing");
describe('Videogular Media', function () {
    var media;
    var cdRef;
    var api;
    var elem = new vg_media_element_1.VgMediaElement();
    elem.duration = 100;
    elem.currentTime = 0;
    elem.volume = 1;
    elem.playbackRate = 1;
    elem.buffered = {
        length: 2,
        start: function () { return 0; },
        end: function () { return 50; }
    };
    elem.id = 'testVideo';
    beforeEach(function () {
        cdRef = {
            detectChanges: function () { },
            markForCheck: function () { },
            detach: function () { },
            reattach: function () { },
            checkNoChanges: function () { }
        };
        api = new vg_api_1.VgAPI();
        media = new vg_media_1.VgMedia(api, cdRef);
        media.vgMedia = elem;
        elem.currentTime = 0;
    });
    it('Should load a new media if a change on dom have been happened', testing_1.fakeAsync(function () {
        spyOn(elem, 'load').and.callThrough();
        spyOn(elem, 'pause').and.callThrough();
        media.onMutation([
            {
                type: 'attributes',
                attributeName: 'src',
                target: {
                    src: 'my-new-file.mp4'
                }
            }
        ]);
        testing_1.tick(10);
        expect(elem.load).toHaveBeenCalled();
        expect(elem.pause).toHaveBeenCalled();
        expect(elem.currentTime).toBe(0);
    }));
    it('Should not be master by default', function () {
        expect(media.vgMaster).toBeFalsy();
    });
    it('Should have a play method', function () {
        spyOn(elem, 'play');
        media.play();
        expect(elem.play).toHaveBeenCalled();
    });
    it('Should have a pause method', function () {
        spyOn(elem, 'pause');
        media.pause();
        expect(elem.pause).toHaveBeenCalled();
    });
    it('Should have setter/getter props', function () {
        expect(media.duration).toBe(100);
        expect(media.currentTime).toBe(0);
        expect(media.volume).toBe(1);
        expect(media.playbackRate).toBe(1);
        expect(media.buffered.length).toEqual(2);
        media.currentTime = 50;
        media.volume = 0.5;
        media.playbackRate = 0.5;
        expect(elem.currentTime).toBe(50);
        expect(elem.volume).toBe(0.5);
        expect(elem.playbackRate).toBe(0.5);
    });
    it('Should handle onCanPlay native event', function () {
        expect(media.canPlay).toBeFalsy();
        media.onCanPlay({});
        expect(media.canPlay).toBeTruthy();
    });
    it('Should handle onCanPlayThrough native event', function () {
        expect(media.canPlayThrough).toBeFalsy();
        media.onCanPlayThrough({});
        expect(media.canPlayThrough).toBeTruthy();
    });
    it('Should handle onLoadMetadata native event', function () {
        expect(media.isMetadataLoaded).toBeFalsy();
        media.onLoadMetadata({});
        expect(media.isMetadataLoaded).toBeTruthy();
        expect(media.time.total).toBe(100000);
    });
    it('Should handle onWait native event', function () {
        expect(media.isWaiting).toBeFalsy();
        media.onWait({});
        expect(media.isWaiting).toBeTruthy();
    });
    it('Should handle onComplete native event', function () {
        expect(media.isCompleted).toBeFalsy();
        media.state = vg_states_1.VgStates.VG_PLAYING;
        media.onComplete({});
        expect(media.isCompleted).toBeTruthy();
        expect(media.state).toBe(vg_states_1.VgStates.VG_ENDED);
    });
    it('Should handle onStartPlaying native event', function () {
        expect(media.state).toBe(vg_states_1.VgStates.VG_PAUSED);
        media.onStartPlaying({});
        expect(media.state).toBe(vg_states_1.VgStates.VG_PLAYING);
    });
    it('Should handle onPlay native event', function () {
        expect(media.state).toBe(vg_states_1.VgStates.VG_PAUSED);
        media.onPlay({});
        expect(media.state).toBe(vg_states_1.VgStates.VG_PLAYING);
    });
    it('Should handle onPause native event', function () {
        media.state = vg_states_1.VgStates.VG_PLAYING;
        media.onPause({});
        expect(media.state).toBe(vg_states_1.VgStates.VG_PAUSED);
    });
    it('Should handle onTimeUpdate native event (with buffer)', function () {
        elem.currentTime = 25;
        media.onTimeUpdate({});
        expect(media.time.current).toBe(25000);
        expect(media.time.left).toBe(75000);
        expect(media.buffer.end).toBe(50000);
    });
    it('Should handle onTimeUpdate native event (without buffer)', function () {
        elem.currentTime = 25;
        elem.buffered = {
            length: 0,
            start: function () { return 0; },
            end: function () { return 0; }
        };
        media.onTimeUpdate({});
        expect(media.time.current).toBe(25000);
        expect(media.time.left).toBe(75000);
        expect(media.buffer.end).toBe(0);
        elem.buffered = {
            length: 2,
            start: function () { return 0; },
            end: function () { return 50; }
        };
    });
    it('Should handle onProgress native event (with buffer)', function () {
        media.onProgress({});
        expect(media.buffer.end).toBe(50000);
    });
    it('Should handle onProgress native event (without buffer)', function () {
        elem.buffered = {
            length: 0,
            start: function () { return 0; },
            end: function () { return 0; }
        };
        media.onProgress({});
        expect(media.buffer.end).toBe(0);
        elem.buffered = {
            length: 2,
            start: function () { return 0; },
            end: function () { return 50; }
        };
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctbWVkaWEuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3ZnLW1lZGlhL3ZnLW1lZGlhLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBcUM7QUFDckMsNkNBQTJDO0FBRTNDLGlEQUErQztBQUMvQyx1REFBb0Q7QUFDcEQsaURBQXdEO0FBR3hELFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtJQUN6QixJQUFJLEtBQWEsQ0FBQztJQUNsQixJQUFJLEtBQXVCLENBQUM7SUFDNUIsSUFBSSxHQUFTLENBQUM7SUFDZCxJQUFJLElBQUksR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztJQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHO1FBQ1osTUFBTSxFQUFFLENBQUM7UUFDVCxLQUFLLEVBQUUsY0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDeEIsR0FBRyxFQUFFLGNBQU8sT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDO0tBQzFCLENBQUM7SUFDRixJQUFJLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQztJQUV0QixVQUFVLENBQUM7UUFFUCxLQUFLLEdBQUc7WUFDSixhQUFhLEVBQUUsY0FBTyxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxjQUFPLENBQUM7WUFDdEIsTUFBTSxFQUFFLGNBQU8sQ0FBQztZQUNoQixRQUFRLEVBQUUsY0FBTyxDQUFDO1lBQ2xCLGNBQWMsRUFBRSxjQUFPLENBQUM7U0FDM0IsQ0FBQztRQUNGLEdBQUcsR0FBRyxJQUFJLGNBQUssRUFBRSxDQUFDO1FBQ2xCLEtBQUssR0FBRyxJQUFJLGtCQUFPLENB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dCB7IFZnTWVkaWEgfSBmcm9tIFwiLi92Zy1tZWRpYVwiO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tIFwiLi4vc2VydmljZXMvdmctYXBpXCI7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWZ1N0YXRlcyB9IGZyb20gXCIuLi9zdGF0ZXMvdmctc3RhdGVzXCI7XG5pbXBvcnQgeyBWZ01lZGlhRWxlbWVudCB9IGZyb20gJy4vdmctbWVkaWEtZWxlbWVudCc7XG5pbXBvcnQgeyBmYWtlQXN5bmMsIHRpY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuXG5cbmRlc2NyaWJlKCdWaWRlb2d1bGFyIE1lZGlhJywgKCkgPT4ge1xuICAgIGxldCBtZWRpYTpWZ01lZGlhO1xuICAgIGxldCBjZFJlZjpDaGFuZ2VEZXRlY3RvclJlZjtcbiAgICBsZXQgYXBpOlZnQVBJO1xuICAgIGxldCBlbGVtID0gbmV3IFZnTWVkaWFFbGVtZW50KCk7XG4gICAgZWxlbS5kdXJhdGlvbiA9IDEwMDtcbiAgICBlbGVtLmN1cnJlbnRUaW1lID0gMDtcbiAgICBlbGVtLnZvbHVtZSA9IDE7XG4gICAgZWxlbS5wbGF5YmFja1JhdGUgPSAxO1xuICAgIGVsZW0uYnVmZmVyZWQgPSB7XG4gICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgc3RhcnQ6ICgpID0+IHtyZXR1cm4gMDt9LFxuICAgICAgICBlbmQ6ICgpID0+IHtyZXR1cm4gNTA7fVxuICAgIH07XG4gICAgZWxlbS5pZCA9ICd0ZXN0VmlkZW8nO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG5cbiAgICAgICAgY2RSZWYgPSB7XG4gICAgICAgICAgICBkZXRlY3RDaGFuZ2VzOiAoKSA9PiB7fSxcbiAgICAgICAgICAgIG1hcmtGb3JDaGVjazogKCkgPT4ge30sXG4gICAgICAgICAgICBkZXRhY2g6ICgpID0+IHt9LFxuICAgICAgICAgICAgcmVhdHRhY2g6ICgpID0+IHt9LFxuICAgICAgICAgICAgY2hlY2tOb0NoYW5nZXM6ICgpID0+IHt9XG4gICAgICAgIH07XG4gICAgICAgIGFwaSA9IG5ldyBWZ0FQSSgpO1xuICAgICAgICBtZWRpYSA9IG5ldyBWZ01lZGlhKGFwaSwgY2RSZWYpO1xuICAgICAgICBtZWRpYS52Z01lZGlhID0gZWxlbTtcbiAgICAgICAgZWxlbS5jdXJyZW50VGltZSA9IDA7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGxvYWQgYSBuZXcgbWVkaWEgaWYgYSBjaGFuZ2Ugb24gZG9tIGhhdmUgYmVlbiBoYXBwZW5lZCcsIDxhbnk+ZmFrZUFzeW5jKCgpOiB2b2lkID0+IHtcbiAgICAgICAgc3B5T24oZWxlbSwgJ2xvYWQnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgc3B5T24oZWxlbSwgJ3BhdXNlJykuYW5kLmNhbGxUaHJvdWdoKCk7XG5cbiAgICAgICAgbWVkaWEub25NdXRhdGlvbihbXG4gICAgICAgICAgICA8YW55PntcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXR0cmlidXRlcycsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlTmFtZTogJ3NyYycsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIHNyYzogJ215LW5ldy1maWxlLm1wNCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRpY2soMTApO1xuXG4gICAgICAgIGV4cGVjdChlbGVtLmxvYWQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KGVsZW0ucGF1c2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KGVsZW0uY3VycmVudFRpbWUpLnRvQmUoMCk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ1Nob3VsZCBub3QgYmUgbWFzdGVyIGJ5IGRlZmF1bHQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChtZWRpYS52Z01hc3RlcikudG9CZUZhbHN5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhdmUgYSBwbGF5IG1ldGhvZCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oZWxlbSwgJ3BsYXknKTtcblxuICAgICAgICBtZWRpYS5wbGF5KCk7XG5cbiAgICAgICAgZXhwZWN0KGVsZW0ucGxheSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYXZlIGEgcGF1c2UgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihlbGVtLCAncGF1c2UnKTtcblxuICAgICAgICBtZWRpYS5wYXVzZSgpO1xuXG4gICAgICAgIGV4cGVjdChlbGVtLnBhdXNlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhdmUgc2V0dGVyL2dldHRlciBwcm9wcycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1lZGlhLmR1cmF0aW9uKS50b0JlKDEwMCk7XG4gICAgICAgIGV4cGVjdChtZWRpYS5jdXJyZW50VGltZSkudG9CZSgwKTtcbiAgICAgICAgZXhwZWN0KG1lZGlhLnZvbHVtZSkudG9CZSgxKTtcbiAgICAgICAgZXhwZWN0KG1lZGlhLnBsYXliYWNrUmF0ZSkudG9CZSgxKTtcbiAgICAgICAgZXhwZWN0KG1lZGlhLmJ1ZmZlcmVkLmxlbmd0aCkudG9FcXVhbCgyKTtcblxuICAgICAgICBtZWRpYS5jdXJyZW50VGltZSA9IDUwO1xuICAgICAgICBtZWRpYS52b2x1bWUgPSAwLjU7XG4gICAgICAgIG1lZGlhLnBsYXliYWNrUmF0ZSA9IDAuNTtcblxuICAgICAgICBleHBlY3QoZWxlbS5jdXJyZW50VGltZSkudG9CZSg1MCk7XG4gICAgICAgIGV4cGVjdChlbGVtLnZvbHVtZSkudG9CZSgwLjUpO1xuICAgICAgICBleHBlY3QoZWxlbS5wbGF5YmFja1JhdGUpLnRvQmUoMC41KTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIG9uQ2FuUGxheSBuYXRpdmUgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChtZWRpYS5jYW5QbGF5KS50b0JlRmFsc3koKTtcblxuICAgICAgICBtZWRpYS5vbkNhblBsYXkoe30pO1xuXG4gICAgICAgIGV4cGVjdChtZWRpYS5jYW5QbGF5KS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhbmRsZSBvbkNhblBsYXlUaHJvdWdoIG5hdGl2ZSBldmVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1lZGlhLmNhblBsYXlUaHJvdWdoKS50b0JlRmFsc3koKTtcblxuICAgICAgICBtZWRpYS5vbkNhblBsYXlUaHJvdWdoKHt9KTtcblxuICAgICAgICBleHBlY3QobWVkaWEuY2FuUGxheVRocm91Z2gpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIG9uTG9hZE1ldGFkYXRhIG5hdGl2ZSBldmVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1lZGlhLmlzTWV0YWRhdGFMb2FkZWQpLnRvQmVGYWxzeSgpO1xuXG4gICAgICAgIG1lZGlhLm9uTG9hZE1ldGFkYXRhKHt9KTtcblxuICAgICAgICBleHBlY3QobWVkaWEuaXNNZXRhZGF0YUxvYWRlZCkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QobWVkaWEudGltZS50b3RhbCkudG9CZSgxMDAwMDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYW5kbGUgb25XYWl0IG5hdGl2ZSBldmVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1lZGlhLmlzV2FpdGluZykudG9CZUZhbHN5KCk7XG5cbiAgICAgICAgbWVkaWEub25XYWl0KHt9KTtcblxuICAgICAgICBleHBlY3QobWVkaWEuaXNXYWl0aW5nKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhbmRsZSBvbkNvbXBsZXRlIG5hdGl2ZSBldmVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1lZGlhLmlzQ29tcGxldGVkKS50b0JlRmFsc3koKTtcblxuICAgICAgICBtZWRpYS5zdGF0ZSA9IFZnU3RhdGVzLlZHX1BMQVlJTkc7XG4gICAgICAgIG1lZGlhLm9uQ29tcGxldGUoe30pO1xuXG4gICAgICAgIGV4cGVjdChtZWRpYS5pc0NvbXBsZXRlZCkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QobWVkaWEuc3RhdGUpLnRvQmUoVmdTdGF0ZXMuVkdfRU5ERUQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYW5kbGUgb25TdGFydFBsYXlpbmcgbmF0aXZlIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobWVkaWEuc3RhdGUpLnRvQmUoVmdTdGF0ZXMuVkdfUEFVU0VEKTtcblxuICAgICAgICBtZWRpYS5vblN0YXJ0UGxheWluZyh7fSk7XG5cbiAgICAgICAgZXhwZWN0KG1lZGlhLnN0YXRlKS50b0JlKFZnU3RhdGVzLlZHX1BMQVlJTkcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYW5kbGUgb25QbGF5IG5hdGl2ZSBldmVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KG1lZGlhLnN0YXRlKS50b0JlKFZnU3RhdGVzLlZHX1BBVVNFRCk7XG5cbiAgICAgICAgbWVkaWEub25QbGF5KHt9KTtcblxuICAgICAgICBleHBlY3QobWVkaWEuc3RhdGUpLnRvQmUoVmdTdGF0ZXMuVkdfUExBWUlORyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhbmRsZSBvblBhdXNlIG5hdGl2ZSBldmVudCcsICgpID0+IHtcbiAgICAgICAgbWVkaWEuc3RhdGUgPSBWZ1N0YXRlcy5WR19QTEFZSU5HO1xuXG4gICAgICAgIG1lZGlhLm9uUGF1c2Uoe30pO1xuXG4gICAgICAgIGV4cGVjdChtZWRpYS5zdGF0ZSkudG9CZShWZ1N0YXRlcy5WR19QQVVTRUQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYW5kbGUgb25UaW1lVXBkYXRlIG5hdGl2ZSBldmVudCAod2l0aCBidWZmZXIpJywgKCkgPT4ge1xuICAgICAgICBlbGVtLmN1cnJlbnRUaW1lID0gMjU7XG5cbiAgICAgICAgbWVkaWEub25UaW1lVXBkYXRlKHt9KTtcblxuICAgICAgICBleHBlY3QobWVkaWEudGltZS5jdXJyZW50KS50b0JlKDI1MDAwKTtcbiAgICAgICAgZXhwZWN0KG1lZGlhLnRpbWUubGVmdCkudG9CZSg3NTAwMCk7XG4gICAgICAgIGV4cGVjdChtZWRpYS5idWZmZXIuZW5kKS50b0JlKDUwMDAwKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIG9uVGltZVVwZGF0ZSBuYXRpdmUgZXZlbnQgKHdpdGhvdXQgYnVmZmVyKScsICgpID0+IHtcbiAgICAgICAgZWxlbS5jdXJyZW50VGltZSA9IDI1O1xuICAgICAgICBlbGVtLmJ1ZmZlcmVkID0ge1xuICAgICAgICAgICAgbGVuZ3RoOiAwLFxuICAgICAgICAgICAgc3RhcnQ6ICgpID0+IHtyZXR1cm4gMDt9LFxuICAgICAgICAgICAgZW5kOiAoKSA9PiB7cmV0dXJuIDA7fVxuICAgICAgICB9O1xuXG4gICAgICAgIG1lZGlhLm9uVGltZVVwZGF0ZSh7fSk7XG5cbiAgICAgICAgZXhwZWN0KG1lZGlhLnRpbWUuY3VycmVudCkudG9CZSgyNTAwMCk7XG4gICAgICAgIGV4cGVjdChtZWRpYS50aW1lLmxlZnQpLnRvQmUoNzUwMDApO1xuICAgICAgICBleHBlY3QobWVkaWEuYnVmZmVyLmVuZCkudG9CZSgwKTtcblxuICAgICAgICBlbGVtLmJ1ZmZlcmVkID0ge1xuICAgICAgICAgICAgbGVuZ3RoOiAyLFxuICAgICAgICAgICAgc3RhcnQ6ICgpID0+IHtyZXR1cm4gMDt9LFxuICAgICAgICAgICAgZW5kOiAoKSA9PiB7cmV0dXJuIDUwO31cbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIG9uUHJvZ3Jlc3MgbmF0aXZlIGV2ZW50ICh3aXRoIGJ1ZmZlciknLCAoKSA9PiB7XG4gICAgICAgIG1lZGlhLm9uUHJvZ3Jlc3Moe30pO1xuXG4gICAgICAgIGV4cGVjdChtZWRpYS5idWZmZXIuZW5kKS50b0JlKDUwMDAwKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIG9uUHJvZ3Jlc3MgbmF0aXZlIGV2ZW50ICh3aXRob3V0IGJ1ZmZlciknLCAoKSA9PiB7XG4gICAgICAgIGVsZW0uYnVmZmVyZWQgPSB7XG4gICAgICAgICAgICBsZW5ndGg6IDAsXG4gICAgICAgICAgICBzdGFydDogKCkgPT4ge3JldHVybiAwO30sXG4gICAgICAgICAgICBlbmQ6ICgpID0+IHtyZXR1cm4gMDt9XG4gICAgICAgIH07XG5cbiAgICAgICAgbWVkaWEub25Qcm9ncmVzcyh7fSk7XG5cbiAgICAgICAgZXhwZWN0KG1lZGlhLmJ1ZmZlci5lbmQpLnRvQmUoMCk7XG5cbiAgICAgICAgZWxlbS5idWZmZXJlZCA9IHtcbiAgICAgICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgICAgIHN0YXJ0OiAoKSA9PiB7cmV0dXJuIDA7fSxcbiAgICAgICAgICAgIGVuZDogKCkgPT4ge3JldHVybiA1MDt9XG4gICAgICAgIH07XG4gICAgfSk7XG59KTtcbiJdfQ==