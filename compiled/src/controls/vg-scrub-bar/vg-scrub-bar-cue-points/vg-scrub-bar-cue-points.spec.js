"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_scrub_bar_cue_points_1 = require("./vg-scrub-bar-cue-points");
var vg_api_1 = require("../../../core/services/vg-api");
describe('Scrub bar current time', function () {
    var scrubBarCuePoints;
    var ref;
    var api;
    beforeEach(function () {
        ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                },
                subscriptions: {
                    loadedMetadata: {
                        subscribe: function () {
                        }
                    }
                }
            }
        };
        api = new vg_api_1.VgAPI();
        scrubBarCuePoints = new vg_scrub_bar_cue_points_1.VgScrubBarCuePoints(ref, api);
    });
    it('Should create cue points when metadata is loaded', function () {
        var cps = {
            length: 3
        };
        var cp1 = { startTime: 1 };
        var cp2 = { startTime: 5, endTime: 10 };
        var cp3 = { startTime: 15, endTime: 20, text: "{value: 'custom params'}" };
        cps[0] = cp1;
        cps[1] = cp2;
        cps[2] = cp3;
        scrubBarCuePoints.vgCuePoints = cps;
        scrubBarCuePoints.target = {
            time: {
                total: 100000
            }
        };
        scrubBarCuePoints.ngOnChanges({ 'vgCuePoints': { currentValue: cps } });
        expect(scrubBarCuePoints.vgCuePoints[0].$$style).toEqual({ width: '1%', left: '1%' });
        expect(scrubBarCuePoints.vgCuePoints[1].$$style).toEqual({ width: '5%', left: '5%' });
        expect(scrubBarCuePoints.vgCuePoints[2].$$style).toEqual({ width: '5%', left: '15%' });
    });
    it('Should not calculate style position if there is not duration on media', function () {
        var cps = {
            length: 3
        };
        var cp1 = { startTime: 1 };
        var cp2 = { startTime: 5, endTime: 10 };
        var cp3 = { startTime: 15, endTime: 20, text: "{value: 'custom params'}" };
        cps[0] = cp1;
        cps[1] = cp2;
        cps[2] = cp3;
        scrubBarCuePoints.vgCuePoints = cps;
        scrubBarCuePoints.target = {
            time: {
                total: 0
            }
        };
        scrubBarCuePoints.ngOnChanges({ 'vgCuePoints': { currentValue: cps } });
        expect(scrubBarCuePoints.vgCuePoints[0].$$style).toEqual({ width: '0', left: '0' });
        expect(scrubBarCuePoints.vgCuePoints[1].$$style).toEqual({ width: '0', left: '0' });
        expect(scrubBarCuePoints.vgCuePoints[2].$$style).toEqual({ width: '0', left: '0' });
    });
    it('Should do nothing if there are no cue points', function () {
        scrubBarCuePoints.vgCuePoints = null;
        scrubBarCuePoints.onLoadedMetadata();
        scrubBarCuePoints.ngOnChanges({ 'vgCuePoints': { currentValue: null } });
    });
    it('Should handle after view init event', function () {
        spyOn(scrubBarCuePoints.API, 'getMediaById').and.callFake(function () {
            return ref.nativeElement;
        });
        spyOn(ref.nativeElement.subscriptions.loadedMetadata, 'subscribe').and.callThrough();
        scrubBarCuePoints.onPlayerReady();
        expect(ref.nativeElement.subscriptions.loadedMetadata.subscribe).toHaveBeenCalled();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLWN1ZS1wb2ludHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250cm9scy92Zy1zY3J1Yi1iYXIvdmctc2NydWItYmFyLWN1ZS1wb2ludHMvdmctc2NydWItYmFyLWN1ZS1wb2ludHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUFnRTtBQUNoRSx3REFBc0Q7QUFHdEQsUUFBUSxDQUFDLHdCQUF3QixFQUFFO0lBQy9CLElBQUksaUJBQXNDLENBQUM7SUFDM0MsSUFBSSxHQUFlLENBQUM7SUFDcEIsSUFBSSxHQUFVLENBQUM7SUFFZixVQUFVLENBQUM7UUFDUCxHQUFHLEdBQUc7WUFDRixhQUFhLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFLFVBQUMsSUFBSTtvQkFDZixPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQztnQkFDRCxhQUFhLEVBQUU7b0JBQ1gsY0FBYyxFQUFFO3dCQUNaLFNBQVMsRUFBRTt3QkFDWCxDQUFDO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSixDQUFDO1FBRUYsR0FBRyxHQUFHLElBQUksY0FBSyxFQUFFLENBQUM7UUFFbEIsaUJBQWlCLEdBQUcsSUFBSSw2Q0FBbUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsa0RBQWtELEVBQUU7UUFDbkQsSUFBSSxHQUFHLEdBQVc7WUFDZCxNQUFNLEVBQUUsQ0FBQztTQUNaLENBQUM7UUFDRixJQUFJLEdBQUcsR0FBZ0MsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFHLENBQUM7UUFDekQsSUFBSSxHQUFHLEdBQWdDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFHLENBQUM7UUFDdEUsSUFBSSxHQUFHLEdBQWdDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElB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Q0FBQztJQUVILEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtRQUMvQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDckMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEVBQUUsYUFBYSxFQUFpQixFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0YsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUNBQXFDLEVBQUU7UUFDdEMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNyRDtZQUNJLE9BQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUM3QixDQUFDLENBQ0osQ0FBQztRQUVGLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXJGLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN4RixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmdTY3J1YkJhckN1ZVBvaW50cyB9IGZyb20gJy4vdmctc2NydWItYmFyLWN1ZS1wb2ludHMnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBFbGVtZW50UmVmLCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVzY3JpYmUoJ1NjcnViIGJhciBjdXJyZW50IHRpbWUnLCAoKSA9PiB7XG4gICAgbGV0IHNjcnViQmFyQ3VlUG9pbnRzOiBWZ1NjcnViQmFyQ3VlUG9pbnRzO1xuICAgIGxldCByZWY6IEVsZW1lbnRSZWY7XG4gICAgbGV0IGFwaTogVmdBUEk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgcmVmID0ge1xuICAgICAgICAgICAgbmF0aXZlRWxlbWVudDoge1xuICAgICAgICAgICAgICAgIGdldEF0dHJpYnV0ZTogKG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRlZE1ldGFkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhcGkgPSBuZXcgVmdBUEkoKTtcblxuICAgICAgICBzY3J1YkJhckN1ZVBvaW50cyA9IG5ldyBWZ1NjcnViQmFyQ3VlUG9pbnRzKHJlZiwgYXBpKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgY3JlYXRlIGN1ZSBwb2ludHMgd2hlbiBtZXRhZGF0YSBpcyBsb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjcHM6IE9iamVjdCA9IHtcbiAgICAgICAgICAgIGxlbmd0aDogM1xuICAgICAgICB9O1xuICAgICAgICBsZXQgY3AxOiBUZXh0VHJhY2tDdWUgPSAoPFRleHRUcmFja0N1ZT57IHN0YXJ0VGltZTogMSB9KTtcbiAgICAgICAgbGV0IGNwMjogVGV4dFRyYWNrQ3VlID0gKDxUZXh0VHJhY2tDdWU+eyBzdGFydFRpbWU6IDUsIGVuZFRpbWU6IDEwIH0pO1xuICAgICAgICBsZXQgY3AzOiBUZXh0VHJhY2tDdWUgPSAoPFRleHRUcmFja0N1ZT57IHN0YXJ0VGltZTogMTUsIGVuZFRpbWU6IDIwLCB0ZXh0OiBcInt2YWx1ZTogJ2N1c3RvbSBwYXJhbXMnfVwiIH0pO1xuXG4gICAgICAgIGNwc1sgMCBdID0gY3AxO1xuICAgICAgICBjcHNbIDEgXSA9IGNwMjtcbiAgICAgICAgY3BzWyAyIF0gPSBjcDM7XG5cbiAgICAgICAgc2NydWJCYXJDdWVQb2ludHMudmdDdWVQb2ludHMgPSAoPFRleHRUcmFja0N1ZUxpc3Q+Y3BzKTtcblxuICAgICAgICBzY3J1YkJhckN1ZVBvaW50cy50YXJnZXQgPSB7XG4gICAgICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgICAgICAgdG90YWw6IDEwMDAwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNjcnViQmFyQ3VlUG9pbnRzLm5nT25DaGFuZ2VzKHsgJ3ZnQ3VlUG9pbnRzJzogKDxTaW1wbGVDaGFuZ2U+eyBjdXJyZW50VmFsdWU6IGNwcyB9KSB9KTtcblxuICAgICAgICBleHBlY3QoKDxhbnk+c2NydWJCYXJDdWVQb2ludHMudmdDdWVQb2ludHNbIDAgXSkuJCRzdHlsZSkudG9FcXVhbCh7IHdpZHRoOiAnMSUnLCBsZWZ0OiAnMSUnIH0pO1xuICAgICAgICBleHBlY3QoKDxhbnk+c2NydWJCYXJDdWVQb2ludHMudmdDdWVQb2ludHNbIDEgXSkuJCRzdHlsZSkudG9FcXVhbCh7IHdpZHRoOiAnNSUnLCBsZWZ0OiAnNSUnIH0pO1xuICAgICAgICBleHBlY3QoKDxhbnk+c2NydWJCYXJDdWVQb2ludHMudmdDdWVQb2ludHNbIDIgXSkuJCRzdHlsZSkudG9FcXVhbCh7IHdpZHRoOiAnNSUnLCBsZWZ0OiAnMTUlJyB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgbm90IGNhbGN1bGF0ZSBzdHlsZSBwb3NpdGlvbiBpZiB0aGVyZSBpcyBub3QgZHVyYXRpb24gb24gbWVkaWEnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjcHM6IE9iamVjdCA9IHtcbiAgICAgICAgICAgIGxlbmd0aDogM1xuICAgICAgICB9O1xuICAgICAgICBsZXQgY3AxOiBUZXh0VHJhY2tDdWUgPSAoPFRleHRUcmFja0N1ZT57IHN0YXJ0VGltZTogMSB9KTtcbiAgICAgICAgbGV0IGNwMjogVGV4dFRyYWNrQ3VlID0gKDxUZXh0VHJhY2tDdWU+eyBzdGFydFRpbWU6IDUsIGVuZFRpbWU6IDEwIH0pO1xuICAgICAgICBsZXQgY3AzOiBUZXh0VHJhY2tDdWUgPSAoPFRleHRUcmFja0N1ZT57IHN0YXJ0VGltZTogMTUsIGVuZFRpbWU6IDIwLCB0ZXh0OiBcInt2YWx1ZTogJ2N1c3RvbSBwYXJhbXMnfVwiIH0pO1xuXG4gICAgICAgIGNwc1sgMCBdID0gY3AxO1xuICAgICAgICBjcHNbIDEgXSA9IGNwMjtcbiAgICAgICAgY3BzWyAyIF0gPSBjcDM7XG5cbiAgICAgICAgc2NydWJCYXJDdWVQb2ludHMudmdDdWVQb2ludHMgPSAoPFRleHRUcmFja0N1ZUxpc3Q+Y3BzKTtcblxuICAgICAgICBzY3J1YkJhckN1ZVBvaW50cy50YXJnZXQgPSB7XG4gICAgICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgICAgICAgdG90YWw6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzY3J1YkJhckN1ZVBvaW50cy5uZ09uQ2hhbmdlcyh7ICd2Z0N1ZVBvaW50cyc6ICg8U2ltcGxlQ2hhbmdlPnsgY3VycmVudFZhbHVlOiBjcHMgfSkgfSk7XG5cbiAgICAgICAgZXhwZWN0KCg8YW55PnNjcnViQmFyQ3VlUG9pbnRzLnZnQ3VlUG9pbnRzWyAwIF0pLiQkc3R5bGUpLnRvRXF1YWwoeyB3aWR0aDogJzAnLCBsZWZ0OiAnMCcgfSk7XG4gICAgICAgIGV4cGVjdCgoPGFueT5zY3J1YkJhckN1ZVBvaW50cy52Z0N1ZVBvaW50c1sgMSBdKS4kJHN0eWxlKS50b0VxdWFsKHsgd2lkdGg6ICcwJywgbGVmdDogJzAnIH0pO1xuICAgICAgICBleHBlY3QoKDxhbnk+c2NydWJCYXJDdWVQb2ludHMudmdDdWVQb2ludHNbIDIgXSkuJCRzdHlsZSkudG9FcXVhbCh7IHdpZHRoOiAnMCcsIGxlZnQ6ICcwJyB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgZG8gbm90aGluZyBpZiB0aGVyZSBhcmUgbm8gY3VlIHBvaW50cycsICgpID0+IHtcbiAgICAgICAgc2NydWJCYXJDdWVQb2ludHMudmdDdWVQb2ludHMgPSBudWxsO1xuICAgICAgICBzY3J1YkJhckN1ZVBvaW50cy5vbkxvYWRlZE1ldGFkYXRhKCk7XG4gICAgICAgIHNjcnViQmFyQ3VlUG9pbnRzLm5nT25DaGFuZ2VzKHsgJ3ZnQ3VlUG9pbnRzJzogKDxTaW1wbGVDaGFuZ2U+eyBjdXJyZW50VmFsdWU6IG51bGwgfSkgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhbmRsZSBhZnRlciB2aWV3IGluaXQgZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKHNjcnViQmFyQ3VlUG9pbnRzLkFQSSwgJ2dldE1lZGlhQnlJZCcpLmFuZC5jYWxsRmFrZShcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgc3B5T24ocmVmLm5hdGl2ZUVsZW1lbnQuc3Vic2NyaXB0aW9ucy5sb2FkZWRNZXRhZGF0YSwgJ3N1YnNjcmliZScpLmFuZC5jYWxsVGhyb3VnaCgpO1xuXG4gICAgICAgIHNjcnViQmFyQ3VlUG9pbnRzLm9uUGxheWVyUmVhZHkoKTtcblxuICAgICAgICBleHBlY3QocmVmLm5hdGl2ZUVsZW1lbnQuc3Vic2NyaXB0aW9ucy5sb2FkZWRNZXRhZGF0YS5zdWJzY3JpYmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbn0pO1xuIl19