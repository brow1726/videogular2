"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_scrub_bar_1 = require("./vg-scrub-bar");
var vg_api_1 = require("../../core/services/vg-api");
var vg_controls_hidden_1 = require("./../../core/services/vg-controls-hidden");
var vg_media_1 = require("../../core/vg-media/vg-media");
var vg_states_1 = require("../../core/states/vg-states");
var vg_media_element_1 = require("../../core/vg-media/vg-media-element");
describe('Scrub bar', function () {
    var scrubBar;
    var ref;
    var cdRef;
    var api;
    var vgControlsHiddenState;
    var media;
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
        ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                },
                scrollWidth: 200
            }
        };
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
        vgControlsHiddenState = new vg_controls_hidden_1.VgControlsHidden();
        scrubBar = new vg_scrub_bar_1.VgScrubBar(ref, api, vgControlsHiddenState);
    });
    it('Should get media by id on init', function () {
        spyOn(api, 'getMediaById');
        scrubBar.vgFor = 'test';
        scrubBar.onPlayerReady();
        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });
    it('Should show scrub bar', function () {
        vgControlsHiddenState.state(false);
        expect(scrubBar.hideScrubBar).toBe(false);
    });
    it('Should hide scrub bar', function () {
        vgControlsHiddenState.state(true);
        expect(scrubBar.hideScrubBar).toBe(true);
    });
    describe('onMouseDownScrubBar', function () {
        it('should call API seekTime 10 when offsetX is 20 and scrollWidth is 200', function () {
            api = {
                seekTime: function () { },
                pause: function () { },
                registerMedia: function () { },
                state: vg_states_1.VgStates.VG_PLAYING,
                isLive: false,
                canPlay: true
            };
            spyOn(api, 'pause');
            media.onCanPlay({});
            api.registerMedia(media);
            scrubBar.target = api;
            scrubBar.target.canPlay = true;
            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;
            scrubBar.onMouseDownScrubBar({ offsetX: 20 });
            expect(api.pause).toHaveBeenCalled();
        });
    });
    describe('onMouseMoveScrubBar', function () {
        it('should modify time.current to 10 when offsetX is 20 and scrollWidth is 200 and vgSlider is true and isSeeking is true', function () {
            spyOn(api, 'seekTime');
            scrubBar.target = api;
            scrubBar.vgSlider = false;
            scrubBar.onMouseMoveScrubBar({ offsetX: 20 });
            expect(api.seekTime).toHaveBeenCalledTimes(0);
            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;
            scrubBar.onMouseMoveScrubBar({ offsetX: 20 });
            expect(api.seekTime).toHaveBeenCalledWith(10, true);
        });
    });
    describe('onMouseUpScrubBar', function () {
        it('should modify time.current to 10 when offsetX is 20 and scrollWidth is 200 and vgSlider is true and isSeeking is true', function () {
            spyOn(api, 'seekTime');
            media.onCanPlay({});
            api.registerMedia(media);
            scrubBar.target = api;
            scrubBar.vgSlider = false;
            scrubBar.onMouseUpScrubBar({ offsetX: 20 });
            expect(api.seekTime).toHaveBeenCalledTimes(0);
            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;
            scrubBar.onMouseUpScrubBar({ offsetX: 20 });
            expect(api.seekTime).toHaveBeenCalledWith(10, true);
        });
    });
    describe('onTouchStartScrubBar', function () {
        it('should call API seekTime 10 when offsetX is 20 and scrollWidth is 200', function () {
            spyOn(api, 'seekTime');
            spyOn(api, 'pause');
            media.onCanPlay({});
            api.registerMedia(media);
            scrubBar.target = api;
            scrubBar.vgSlider = false;
            scrubBar.onTouchStartScrubBar({ touches: [{ pageX: 20 }] });
            expect(api.seekTime).toHaveBeenCalledWith(10, true);
            expect(api.pause).toHaveBeenCalledTimes(0);
            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;
            scrubBar.onTouchStartScrubBar({ touches: [{ pageX: 20 }] });
            expect(api.seekTime).toHaveBeenCalledTimes(1);
            expect(api.pause).toHaveBeenCalledTimes(1);
        });
    });
    describe('onTouchMoveScrubBar', function () {
        it('should modify time.current to 10 when offsetX is 20 and scrollWidth is 200 and vgSlider is true and isSeeking is true', function () {
            spyOn(api, 'seekTime');
            scrubBar.target = api;
            scrubBar.vgSlider = false;
            scrubBar.onTouchMoveScrubBar({ touches: [{ pageX: 20 }] });
            expect(api.seekTime).toHaveBeenCalledTimes(0);
            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;
            scrubBar.onTouchMoveScrubBar({ touches: [{ pageX: 20 }] });
            expect(api.seekTime).toHaveBeenCalledWith(10, true);
        });
    });
    describe('onTouchCancelScrubBar', function () {
        it('should not seek', function () {
            spyOn(api, 'seekTime');
            scrubBar.target = api;
            scrubBar.vgSlider = false;
            scrubBar.onTouchCancelScrubBar({ touches: [{ pageX: 20 }] });
            expect(api.seekTime).toHaveBeenCalledTimes(0);
            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;
            scrubBar.onTouchCancelScrubBar({ touches: [{ pageX: 20 }] });
            expect(api.seekTime).toHaveBeenCalledTimes(0);
        });
    });
    describe('onTouchEndScrubBar', function () {
        it('should not seek', function () {
            spyOn(api, 'seekTime');
            scrubBar.target = api;
            scrubBar.vgSlider = false;
            scrubBar.onTouchEndScrubBar({ touches: [{ pageX: 20 }] });
            expect(api.seekTime).toHaveBeenCalledTimes(0);
            scrubBar.vgSlider = true;
            scrubBar.isSeeking = true;
            scrubBar.onTouchEndScrubBar({ touches: [{ pageX: 20 }] });
            expect(api.seekTime).toHaveBeenCalledTimes(0);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbHMvdmctc2NydWItYmFyL3ZnLXNjcnViLWJhci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTBDO0FBQzFDLHFEQUFpRDtBQUVqRCwrRUFBMEU7QUFDMUUseURBQXFEO0FBQ3JELHlEQUF1RDtBQUN2RCx5RUFBc0U7QUFFdEUsUUFBUSxDQUFDLFdBQVcsRUFBRTtJQUNsQixJQUFJLFFBQW1CLENBQUM7SUFDeEIsSUFBSSxHQUFjLENBQUM7SUFDbkIsSUFBSSxLQUF1QixDQUFDO0lBQzVCLElBQUksR0FBUyxDQUFDO0lBQ2QsSUFBSSxxQkFBdUMsQ0FBQztJQUM1QyxJQUFJLEtBQWEsQ0FBQztJQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztJQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHO1FBQ1osTUFBTSxFQUFFLENBQUM7UUFDVCxLQUFLLEVBQUUsY0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDeEIsR0FBRyxFQUFFLGNBQU8sT0FBTyxFQUFFLENBQUMsQ0FBQSxDQUFDO0tBQzFCLENBQUM7SUFDRixJQUFJLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQztJQUV0QixVQUFVLENBQUM7UUFDUCxHQUFHLEdBQUc7WUFDRixhQUFhLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFLFVBQUMsSUFBSTtvQkFDZixPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQztnQkFDRCxXQUFXLEVBQUUsR0FBRzthQUNuQjtTQUNKLENBQUM7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RCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmdTY3J1YkJhcn0gZnJvbSBcIi4vdmctc2NydWItYmFyXCI7XG5pbXBvcnQge1ZnQVBJfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy92Zy1hcGlcIjtcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZnQ29udHJvbHNIaWRkZW59IGZyb20gJy4vLi4vLi4vY29yZS9zZXJ2aWNlcy92Zy1jb250cm9scy1oaWRkZW4nO1xuaW1wb3J0IHtWZ01lZGlhfSBmcm9tIFwiLi4vLi4vY29yZS92Zy1tZWRpYS92Zy1tZWRpYVwiO1xuaW1wb3J0IHsgVmdTdGF0ZXMgfSBmcm9tICcuLi8uLi9jb3JlL3N0YXRlcy92Zy1zdGF0ZXMnO1xuaW1wb3J0IHsgVmdNZWRpYUVsZW1lbnQgfSBmcm9tICcuLi8uLi9jb3JlL3ZnLW1lZGlhL3ZnLW1lZGlhLWVsZW1lbnQnO1xuXG5kZXNjcmliZSgnU2NydWIgYmFyJywgKCkgPT4ge1xuICAgIGxldCBzY3J1YkJhcjpWZ1NjcnViQmFyO1xuICAgIGxldCByZWY6RWxlbWVudFJlZjtcbiAgICBsZXQgY2RSZWY6Q2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgbGV0IGFwaTpWZ0FQSTtcbiAgICBsZXQgdmdDb250cm9sc0hpZGRlblN0YXRlOiBWZ0NvbnRyb2xzSGlkZGVuO1xuICAgIGxldCBtZWRpYTpWZ01lZGlhO1xuICAgIGxldCBlbGVtID0gbmV3IFZnTWVkaWFFbGVtZW50KCk7XG4gICAgZWxlbS5kdXJhdGlvbiA9IDEwMDtcbiAgICBlbGVtLmN1cnJlbnRUaW1lID0gMDtcbiAgICBlbGVtLnZvbHVtZSA9IDE7XG4gICAgZWxlbS5wbGF5YmFja1JhdGUgPSAxO1xuICAgIGVsZW0uYnVmZmVyZWQgPSB7XG4gICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgc3RhcnQ6ICgpID0+IHtyZXR1cm4gMDt9LFxuICAgICAgICBlbmQ6ICgpID0+IHtyZXR1cm4gNTA7fVxuICAgIH07XG4gICAgZWxlbS5pZCA9ICd0ZXN0VmlkZW8nO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHJlZiA9IHtcbiAgICAgICAgICAgIG5hdGl2ZUVsZW1lbnQ6IHtcbiAgICAgICAgICAgICAgICBnZXRBdHRyaWJ1dGU6IChuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsV2lkdGg6IDIwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjZFJlZiA9IHtcbiAgICAgICAgICAgIGRldGVjdENoYW5nZXM6ICgpID0+IHt9LFxuICAgICAgICAgICAgbWFya0ZvckNoZWNrOiAoKSA9PiB7fSxcbiAgICAgICAgICAgIGRldGFjaDogKCkgPT4ge30sXG4gICAgICAgICAgICByZWF0dGFjaDogKCkgPT4ge30sXG4gICAgICAgICAgICBjaGVja05vQ2hhbmdlczogKCkgPT4ge31cbiAgICAgICAgfTtcblxuICAgICAgICBhcGkgPSBuZXcgVmdBUEkoKTtcbiAgICAgICAgbWVkaWEgPSBuZXcgVmdNZWRpYShhcGksIGNkUmVmKTtcbiAgICAgICAgbWVkaWEudmdNZWRpYSA9IGVsZW07XG4gICAgICAgIHZnQ29udHJvbHNIaWRkZW5TdGF0ZSA9IG5ldyBWZ0NvbnRyb2xzSGlkZGVuKCk7XG5cbiAgICAgICAgc2NydWJCYXIgPSBuZXcgVmdTY3J1YkJhcihyZWYsIGFwaSwgdmdDb250cm9sc0hpZGRlblN0YXRlKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgZ2V0IG1lZGlhIGJ5IGlkIG9uIGluaXQnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGFwaSwgJ2dldE1lZGlhQnlJZCcpO1xuXG4gICAgICAgIHNjcnViQmFyLnZnRm9yID0gJ3Rlc3QnO1xuICAgICAgICBzY3J1YkJhci5vblBsYXllclJlYWR5KCk7XG5cbiAgICAgICAgZXhwZWN0KGFwaS5nZXRNZWRpYUJ5SWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCd0ZXN0Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIHNob3cgc2NydWIgYmFyJywgKCkgPT4ge1xuICAgICAgICB2Z0NvbnRyb2xzSGlkZGVuU3RhdGUuc3RhdGUoZmFsc2UpO1xuICAgICAgICBleHBlY3Qoc2NydWJCYXIuaGlkZVNjcnViQmFyKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGlkZSBzY3J1YiBiYXInLCAoKSA9PiB7XG4gICAgICAgIHZnQ29udHJvbHNIaWRkZW5TdGF0ZS5zdGF0ZSh0cnVlKTtcbiAgICAgICAgZXhwZWN0KHNjcnViQmFyLmhpZGVTY3J1YkJhcikudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbk1vdXNlRG93blNjcnViQmFyJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgQVBJIHNlZWtUaW1lIDEwIHdoZW4gb2Zmc2V0WCBpcyAyMCBhbmQgc2Nyb2xsV2lkdGggaXMgMjAwJywgKCkgPT4ge1xuICAgICAgICAgICAgYXBpID0gPGFueT57XG4gICAgICAgICAgICAgICAgc2Vla1RpbWU6ICgpID0+IHt9LFxuICAgICAgICAgICAgICAgIHBhdXNlOiAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgICByZWdpc3Rlck1lZGlhOiAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgICBzdGF0ZTogVmdTdGF0ZXMuVkdfUExBWUlORyxcbiAgICAgICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNhblBsYXk6IHRydWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNweU9uKGFwaSwgJ3BhdXNlJyk7XG5cbiAgICAgICAgICAgIG1lZGlhLm9uQ2FuUGxheSh7fSk7XG4gICAgICAgICAgICBhcGkucmVnaXN0ZXJNZWRpYShtZWRpYSk7XG5cbiAgICAgICAgICAgIHNjcnViQmFyLnRhcmdldCA9IGFwaTtcbiAgICAgICAgICAgIHNjcnViQmFyLnRhcmdldC5jYW5QbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcnViQmFyLnZnU2xpZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcnViQmFyLmlzU2Vla2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHNjcnViQmFyLm9uTW91c2VEb3duU2NydWJCYXIoeyBvZmZzZXRYOiAyMCB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KGFwaS5wYXVzZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbk1vdXNlTW92ZVNjcnViQmFyJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIG1vZGlmeSB0aW1lLmN1cnJlbnQgdG8gMTAgd2hlbiBvZmZzZXRYIGlzIDIwIGFuZCBzY3JvbGxXaWR0aCBpcyAyMDAgYW5kIHZnU2xpZGVyIGlzIHRydWUgYW5kIGlzU2Vla2luZyBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oYXBpLCAnc2Vla1RpbWUnKTtcblxuICAgICAgICAgICAgc2NydWJCYXIudGFyZ2V0ID0gYXBpO1xuICAgICAgICAgICAgc2NydWJCYXIudmdTbGlkZXIgPSBmYWxzZTtcblxuICAgICAgICAgICAgc2NydWJCYXIub25Nb3VzZU1vdmVTY3J1YkJhcih7IG9mZnNldFg6IDIwIH0pO1xuXG4gICAgICAgICAgICBleHBlY3QoYXBpLnNlZWtUaW1lKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMCk7XG5cbiAgICAgICAgICAgIHNjcnViQmFyLnZnU2xpZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcnViQmFyLmlzU2Vla2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHNjcnViQmFyLm9uTW91c2VNb3ZlU2NydWJCYXIoeyBvZmZzZXRYOiAyMCB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KGFwaS5zZWVrVGltZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoMTAsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbk1vdXNlVXBTY3J1YkJhcicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBtb2RpZnkgdGltZS5jdXJyZW50IHRvIDEwIHdoZW4gb2Zmc2V0WCBpcyAyMCBhbmQgc2Nyb2xsV2lkdGggaXMgMjAwIGFuZCB2Z1NsaWRlciBpcyB0cnVlIGFuZCBpc1NlZWtpbmcgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGFwaSwgJ3NlZWtUaW1lJyk7XG5cbiAgICAgICAgICAgIG1lZGlhLm9uQ2FuUGxheSh7fSk7XG4gICAgICAgICAgICBhcGkucmVnaXN0ZXJNZWRpYShtZWRpYSk7XG5cbiAgICAgICAgICAgIHNjcnViQmFyLnRhcmdldCA9IGFwaTtcbiAgICAgICAgICAgIHNjcnViQmFyLnZnU2xpZGVyID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHNjcnViQmFyLm9uTW91c2VVcFNjcnViQmFyKHsgb2Zmc2V0WDogMjAgfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhcGkuc2Vla1RpbWUpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygwKTtcblxuICAgICAgICAgICAgc2NydWJCYXIudmdTbGlkZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2NydWJCYXIuaXNTZWVraW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgc2NydWJCYXIub25Nb3VzZVVwU2NydWJCYXIoeyBvZmZzZXRYOiAyMCB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KGFwaS5zZWVrVGltZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoMTAsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvblRvdWNoU3RhcnRTY3J1YkJhcicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIEFQSSBzZWVrVGltZSAxMCB3aGVuIG9mZnNldFggaXMgMjAgYW5kIHNjcm9sbFdpZHRoIGlzIDIwMCcsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGFwaSwgJ3NlZWtUaW1lJyk7XG4gICAgICAgICAgICBzcHlPbihhcGksICdwYXVzZScpO1xuXG4gICAgICAgICAgICBtZWRpYS5vbkNhblBsYXkoe30pO1xuICAgICAgICAgICAgYXBpLnJlZ2lzdGVyTWVkaWEobWVkaWEpO1xuXG4gICAgICAgICAgICBzY3J1YkJhci50YXJnZXQgPSBhcGk7XG4gICAgICAgICAgICBzY3J1YkJhci52Z1NsaWRlciA9IGZhbHNlO1xuXG4gICAgICAgICAgICBzY3J1YkJhci5vblRvdWNoU3RhcnRTY3J1YkJhcih7IHRvdWNoZXM6IFsge3BhZ2VYOiAyMCB9XX0pO1xuXG4gICAgICAgICAgICBleHBlY3QoYXBpLnNlZWtUaW1lKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgxMCwgdHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoYXBpLnBhdXNlKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMCk7XG5cbiAgICAgICAgICAgIHNjcnViQmFyLnZnU2xpZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjcnViQmFyLmlzU2Vla2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHNjcnViQmFyLm9uVG91Y2hTdGFydFNjcnViQmFyKHsgdG91Y2hlczogWyB7cGFnZVg6IDIwIH1dfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhcGkuc2Vla1RpbWUpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgICAgICAgIGV4cGVjdChhcGkucGF1c2UpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25Ub3VjaE1vdmVTY3J1YkJhcicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBtb2RpZnkgdGltZS5jdXJyZW50IHRvIDEwIHdoZW4gb2Zmc2V0WCBpcyAyMCBhbmQgc2Nyb2xsV2lkdGggaXMgMjAwIGFuZCB2Z1NsaWRlciBpcyB0cnVlIGFuZCBpc1NlZWtpbmcgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGFwaSwgJ3NlZWtUaW1lJyk7XG5cbiAgICAgICAgICAgIHNjcnViQmFyLnRhcmdldCA9IGFwaTtcbiAgICAgICAgICAgIHNjcnViQmFyLnZnU2xpZGVyID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHNjcnViQmFyLm9uVG91Y2hNb3ZlU2NydWJCYXIoeyB0b3VjaGVzOiBbIHtwYWdlWDogMjAgfV19KTtcblxuICAgICAgICAgICAgZXhwZWN0KGFwaS5zZWVrVGltZSkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDApO1xuXG4gICAgICAgICAgICBzY3J1YkJhci52Z1NsaWRlciA9IHRydWU7XG4gICAgICAgICAgICBzY3J1YkJhci5pc1NlZWtpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBzY3J1YkJhci5vblRvdWNoTW92ZVNjcnViQmFyKHsgdG91Y2hlczogWyB7cGFnZVg6IDIwIH1dfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhcGkuc2Vla1RpbWUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDEwLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25Ub3VjaENhbmNlbFNjcnViQmFyJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIG5vdCBzZWVrJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oYXBpLCAnc2Vla1RpbWUnKTtcblxuICAgICAgICAgICAgc2NydWJCYXIudGFyZ2V0ID0gYXBpO1xuICAgICAgICAgICAgc2NydWJCYXIudmdTbGlkZXIgPSBmYWxzZTtcblxuICAgICAgICAgICAgc2NydWJCYXIub25Ub3VjaENhbmNlbFNjcnViQmFyKHsgdG91Y2hlczogWyB7cGFnZVg6IDIwIH1dfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhcGkuc2Vla1RpbWUpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygwKTtcblxuICAgICAgICAgICAgc2NydWJCYXIudmdTbGlkZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2NydWJCYXIuaXNTZWVraW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgc2NydWJCYXIub25Ub3VjaENhbmNlbFNjcnViQmFyKHsgdG91Y2hlczogWyB7cGFnZVg6IDIwIH1dfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhcGkuc2Vla1RpbWUpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25Ub3VjaEVuZFNjcnViQmFyJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIG5vdCBzZWVrJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oYXBpLCAnc2Vla1RpbWUnKTtcblxuICAgICAgICAgICAgc2NydWJCYXIudGFyZ2V0ID0gYXBpO1xuICAgICAgICAgICAgc2NydWJCYXIudmdTbGlkZXIgPSBmYWxzZTtcblxuICAgICAgICAgICAgc2NydWJCYXIub25Ub3VjaEVuZFNjcnViQmFyKHsgdG91Y2hlczogWyB7cGFnZVg6IDIwIH1dfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhcGkuc2Vla1RpbWUpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygwKTtcblxuICAgICAgICAgICAgc2NydWJCYXIudmdTbGlkZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2NydWJCYXIuaXNTZWVraW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgc2NydWJCYXIub25Ub3VjaEVuZFNjcnViQmFyKHsgdG91Y2hlczogWyB7cGFnZVg6IDIwIH1dfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhcGkuc2Vla1RpbWUpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdfQ==