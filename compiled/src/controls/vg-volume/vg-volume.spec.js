"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_volume_1 = require("./vg-volume");
var vg_api_1 = require("../../core/services/vg-api");
describe('Volume control', function () {
    var vgVol;
    var ref;
    var api;
    beforeEach(function () {
        ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                }
            }
        };
        api = new vg_api_1.VgAPI();
        vgVol = new vg_volume_1.VgVolume(ref, api);
    });
    it('Should have isDragging set to false initially', function () {
        expect(vgVol.isDragging).toBe(false);
    });
    describe('onPlayerReady', function () {
        it('Should set vgFor', function () {
            vgVol.vgFor = 'test';
            vgVol.onPlayerReady();
            expect(vgVol.vgFor).toBe('test');
        });
        it('Should set target', function () {
            spyOn(api, 'getMediaById');
            vgVol.onPlayerReady();
            expect(api.getMediaById).toHaveBeenCalled();
        });
    });
    describe('onMouseDown', function () {
        it('Should set isDragging to true', function () {
            vgVol.onMouseDown({ clientX: 0 });
            expect(vgVol.isDragging).toBe(true);
        });
        it('Should set mouseDownPosX to event.x', function () {
            vgVol.onMouseDown({ clientX: 99 });
            expect(vgVol.mouseDownPosX).toBe(99);
        });
    });
    describe('onDrag', function () {
        beforeEach(function () {
            spyOn(vgVol, 'setVolume');
            spyOn(vgVol, 'calculateVolume');
        });
        it('Should call setVolume when dragging', function () {
            vgVol.isDragging = true;
            vgVol.onDrag({ clientX: 0 });
            expect(vgVol.setVolume).toHaveBeenCalled();
        });
        it('Should not call setVolume when not dragging', function () {
            vgVol.isDragging = false;
            vgVol.onDrag({ clientX: 0 });
            expect(vgVol.setVolume).not.toHaveBeenCalled();
        });
    });
    describe('onStopDrag', function () {
        beforeEach(function () {
            spyOn(vgVol, 'setVolume');
            spyOn(vgVol, 'calculateVolume');
        });
        it('Should toggle dragging value when dragging', function () {
            vgVol.isDragging = true;
            vgVol.mouseDownPosX = 0;
            vgVol.onStopDrag({ clientX: 0 });
            expect(vgVol.isDragging).toBe(false);
        });
        it('Should call setVolume when dragging and x positions match', function () {
            vgVol.isDragging = true;
            vgVol.mouseDownPosX = 0;
            vgVol.onStopDrag({ clientX: 0 });
            expect(vgVol.setVolume).toHaveBeenCalled();
        });
        it('Should not call setVolume when dragging but x positions dont match', function () {
            vgVol.isDragging = true;
            vgVol.mouseDownPosX = 1;
            vgVol.onStopDrag({ clientX: 0 });
            expect(vgVol.setVolume).not.toHaveBeenCalled();
        });
        it('Should not call setVolume when not dragging', function () {
            vgVol.isDragging = false;
            vgVol.mouseDownPosX = 0;
            vgVol.onStopDrag({ clientX: 0 });
            expect(vgVol.setVolume).not.toHaveBeenCalled();
        });
    });
    describe('calculateVolume', function () {
        it('Shoud calculate volume based on volumeBar position', function () {
            // mock volumeBarRef ViewChild
            vgVol.volumeBarRef = {
                nativeElement: {
                    getBoundingClientRect: function () {
                        return { left: 5, width: 100 };
                    }
                }
            };
            expect(vgVol.calculateVolume(10)).toBe(5);
        });
    });
    describe('setVolume', function () {
        it('Shoud convert volume to a value between 0 and 1', function () {
            vgVol.target = {
                volume: 3.33
            };
            vgVol.setVolume(50);
            expect(vgVol.target.volume).toBe(0.5);
            vgVol.setVolume(110);
            expect(vgVol.target.volume).toBe(1);
            vgVol.setVolume(-10);
            expect(vgVol.target.volume).toBe(0);
        });
    });
    describe('getVolume', function () {
        it('Shoud get target volume when target is set', function () {
            vgVol.target = {
                volume: 3.33
            };
            expect(vgVol.getVolume()).toBe(3.33);
        });
        it('Shoud get 0 volume when target is not set', function () {
            vgVol.target = undefined;
            expect(vgVol.getVolume()).toBe(0);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdm9sdW1lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbHMvdmctdm9sdW1lL3ZnLXZvbHVtZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQXFDO0FBQ3JDLHFEQUFpRDtBQUdqRCxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFDdkIsSUFBSSxLQUFjLENBQUM7SUFDbkIsSUFBSSxHQUFjLENBQUM7SUFDbkIsSUFBSSxHQUFTLENBQUM7SUFFZCxVQUFVLENBQUM7UUFDUCxHQUFHLEdBQUc7WUFDRixhQUFhLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFLFVBQUMsSUFBSTtvQkFDZixPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQzthQUNKO1NBQ0osQ0FBQztRQUVGLEdBQUcsR0FBRyxJQUFJLGNBQUssRUFBRSxDQUFDO1FBQ2xCLEtBQUssR0FBRyxJQUFJLG9CQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFO1FBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN0QixFQUFFLENBQUMsa0JBQWtCLEVBQUU7WUFDbkIsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDckIsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1CQUFtQixFQUFFO1lBQ3BCLEtBQUssQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDM0IsS0FBSyxDQUFD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U0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV0QyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ2xCLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRTtZQUM3QyxLQUFLLENBQUMsTUFBTSxHQUFHO2dCQUNYLE1BQU0sRUFBRSxJQUFJO2FBQ2YsQ0FBQztZQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMkNBQTJDLEVBQUU7WUFDNUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZnVm9sdW1lfSBmcm9tIFwiLi92Zy12b2x1bWVcIjtcbmltcG9ydCB7VmdBUEl9IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaVwiO1xuaW1wb3J0IHtFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5kZXNjcmliZSgnVm9sdW1lIGNvbnRyb2wnLCAoKSA9PiB7XG4gICAgbGV0IHZnVm9sOlZnVm9sdW1lO1xuICAgIGxldCByZWY6RWxlbWVudFJlZjtcbiAgICBsZXQgYXBpOlZnQVBJO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHJlZiA9IHtcbiAgICAgICAgICAgIG5hdGl2ZUVsZW1lbnQ6IHtcbiAgICAgICAgICAgICAgICBnZXRBdHRyaWJ1dGU6IChuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhcGkgPSBuZXcgVmdBUEkoKTtcbiAgICAgICAgdmdWb2wgPSBuZXcgVmdWb2x1bWUocmVmLCBhcGkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYXZlIGlzRHJhZ2dpbmcgc2V0IHRvIGZhbHNlIGluaXRpYWxseScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KHZnVm9sLmlzRHJhZ2dpbmcpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuICAgIFxuICAgIGRlc2NyaWJlKCdvblBsYXllclJlYWR5JywgKCk9PntcbiAgICAgICAgaXQoJ1Nob3VsZCBzZXQgdmdGb3InLCAoKSA9PiB7XG4gICAgICAgICAgICB2Z1ZvbC52Z0ZvciA9ICd0ZXN0JztcbiAgICAgICAgICAgIHZnVm9sLm9uUGxheWVyUmVhZHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCh2Z1ZvbC52Z0ZvcikudG9CZSgndGVzdCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ1Nob3VsZCBzZXQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oYXBpLCAnZ2V0TWVkaWFCeUlkJyk7XG4gICAgICAgICAgICB2Z1ZvbC5vblBsYXllclJlYWR5KCk7XG4gICAgICAgICAgICBleHBlY3QoYXBpLmdldE1lZGlhQnlJZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbk1vdXNlRG93bicsICgpPT57XG4gICAgICAgIGl0KCdTaG91bGQgc2V0IGlzRHJhZ2dpbmcgdG8gdHJ1ZScsICgpPT57XG4gICAgICAgICAgICB2Z1ZvbC5vbk1vdXNlRG93bih7Y2xpZW50WDogMH0pO1xuICAgICAgICAgICAgZXhwZWN0KHZnVm9sLmlzRHJhZ2dpbmcpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnU2hvdWxkIHNldCBtb3VzZURvd25Qb3NYIHRvIGV2ZW50LngnLCAoKT0+e1xuICAgICAgICAgICAgdmdWb2wub25Nb3VzZURvd24oe2NsaWVudFg6IDk5fSk7XG4gICAgICAgICAgICBleHBlY3QodmdWb2wubW91c2VEb3duUG9zWCkudG9CZSg5OSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIGRlc2NyaWJlKCdvbkRyYWcnLCAoKT0+e1xuICAgICAgICBiZWZvcmVFYWNoKCgpPT57XG4gICAgICAgICAgICBzcHlPbih2Z1ZvbCwgJ3NldFZvbHVtZScpO1xuICAgICAgICAgICAgc3B5T24odmdWb2wsICdjYWxjdWxhdGVWb2x1bWUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdTaG91bGQgY2FsbCBzZXRWb2x1bWUgd2hlbiBkcmFnZ2luZycsICgpPT57XG4gICAgICAgICAgICB2Z1ZvbC5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHZnVm9sLm9uRHJhZyh7Y2xpZW50WDogMH0pO1xuICAgICAgICAgICAgZXhwZWN0KHZnVm9sLnNldFZvbHVtZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ1Nob3VsZCBub3QgY2FsbCBzZXRWb2x1bWUgd2hlbiBub3QgZHJhZ2dpbmcnLCAoKT0+e1xuICAgICAgICAgICAgdmdWb2wuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgdmdWb2wub25EcmFnKHtjbGllbnRYOiAwfSk7XG4gICAgICAgICAgICBleHBlY3QodmdWb2wuc2V0Vm9sdW1lKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvblN0b3BEcmFnJywgKCk9PntcbiAgICAgICAgYmVmb3JlRWFjaCgoKT0+e1xuICAgICAgICAgICAgc3B5T24odmdWb2wsICdzZXRWb2x1bWUnKTtcbiAgICAgICAgICAgIHNweU9uKHZnVm9sLCAnY2FsY3VsYXRlVm9sdW1lJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnU2hvdWxkIHRvZ2dsZSBkcmFnZ2luZyB2YWx1ZSB3aGVuIGRyYWdnaW5nJywgKCk9PntcbiAgICAgICAgICAgIHZnVm9sLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdmdWb2wubW91c2VEb3duUG9zWCA9IDA7XG4gICAgICAgICAgICB2Z1ZvbC5vblN0b3BEcmFnKHtjbGllbnRYOjB9KTtcbiAgICAgICAgICAgIGV4cGVjdCh2Z1ZvbC5pc0RyYWdnaW5nKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdTaG91bGQgY2FsbCBzZXRWb2x1bWUgd2hlbiBkcmFnZ2luZyBhbmQgeCBwb3NpdGlvbnMgbWF0Y2gnLCAoKT0+e1xuICAgICAgICAgICAgdmdWb2wuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICB2Z1ZvbC5tb3VzZURvd25Qb3NYID0gMDtcbiAgICAgICAgICAgIHZnVm9sLm9uU3RvcERyYWcoe2NsaWVudFg6MH0pO1xuICAgICAgICAgICAgZXhwZWN0KHZnVm9sLnNldFZvbHVtZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ1Nob3VsZCBub3QgY2FsbCBzZXRWb2x1bWUgd2hlbiBkcmFnZ2luZyBidXQgeCBwb3NpdGlvbnMgZG9udCBtYXRjaCcsICgpPT57XG4gICAgICAgICAgICB2Z1ZvbC5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHZnVm9sLm1vdXNlRG93blBvc1ggPSAxO1xuICAgICAgICAgICAgdmdWb2wub25TdG9wRHJhZyh7Y2xpZW50WDowfSk7XG4gICAgICAgICAgICBleHBlY3QodmdWb2wuc2V0Vm9sdW1lKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ1Nob3VsZCBub3QgY2FsbCBzZXRWb2x1bWUgd2hlbiBub3QgZHJhZ2dpbmcnLCAoKT0+e1xuICAgICAgICAgICAgdmdWb2wuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgdmdWb2wubW91c2VEb3duUG9zWCA9IDA7XG4gICAgICAgICAgICB2Z1ZvbC5vblN0b3BEcmFnKHtjbGllbnRYOjB9KTtcbiAgICAgICAgICAgIGV4cGVjdCh2Z1ZvbC5zZXRWb2x1bWUpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NhbGN1bGF0ZVZvbHVtZScsICgpPT57XG4gICAgICAgIGl0KCdTaG91ZCBjYWxjdWxhdGUgdm9sdW1lIGJhc2VkIG9uIHZvbHVtZUJhciBwb3NpdGlvbicsICgpPT57XG4gICAgICAgICAgICAvLyBtb2NrIHZvbHVtZUJhclJlZiBWaWV3Q2hpbGRcbiAgICAgICAgICAgIHZnVm9sLnZvbHVtZUJhclJlZiA9IHtcbiAgICAgICAgICAgICAgbmF0aXZlRWxlbWVudDoge1xuICAgICAgICAgICAgICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IGxlZnQ6IDUsIHdpZHRoOiAxMDAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QodmdWb2wuY2FsY3VsYXRlVm9sdW1lKDEwKSkudG9CZSg1KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2V0Vm9sdW1lJywgKCk9PntcbiAgICAgICAgaXQoJ1Nob3VkIGNvbnZlcnQgdm9sdW1lIHRvIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxJywgKCk9PntcbiAgICAgICAgICAgIHZnVm9sLnRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICB2b2x1bWU6IDMuMzNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2Z1ZvbC5zZXRWb2x1bWUoNTApO1xuICAgICAgICAgICAgZXhwZWN0KHZnVm9sLnRhcmdldC52b2x1bWUpLnRvQmUoMC41KTtcblxuICAgICAgICAgICAgdmdWb2wuc2V0Vm9sdW1lKDExMCk7XG4gICAgICAgICAgICBleHBlY3QodmdWb2wudGFyZ2V0LnZvbHVtZSkudG9CZSgxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmdWb2wuc2V0Vm9sdW1lKC0xMCk7XG4gICAgICAgICAgICBleHBlY3QodmdWb2wudGFyZ2V0LnZvbHVtZSkudG9CZSgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgZGVzY3JpYmUoJ2dldFZvbHVtZScsICgpPT57XG4gICAgICAgIGl0KCdTaG91ZCBnZXQgdGFyZ2V0IHZvbHVtZSB3aGVuIHRhcmdldCBpcyBzZXQnLCAoKT0+e1xuICAgICAgICAgICAgdmdWb2wudGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgIHZvbHVtZTogMy4zM1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdCh2Z1ZvbC5nZXRWb2x1bWUoKSkudG9CZSgzLjMzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdTaG91ZCBnZXQgMCB2b2x1bWUgd2hlbiB0YXJnZXQgaXMgbm90IHNldCcsICgpPT57XG4gICAgICAgICAgICB2Z1ZvbC50YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBleHBlY3QodmdWb2wuZ2V0Vm9sdW1lKCkpLnRvQmUoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=