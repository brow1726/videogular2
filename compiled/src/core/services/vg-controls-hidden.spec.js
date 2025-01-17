"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var vg_controls_hidden_1 = require("./vg-controls-hidden");
describe('VgControlsHidden Service', function () {
    var controlsHidden;
    beforeEach(function () {
        controlsHidden = new vg_controls_hidden_1.VgControlsHidden();
    });
    it('Should provide an Observable', function () {
        expect(controlsHidden.isHidden).toEqual(jasmine.any(rxjs_1.Observable));
    });
    it('Should set state to true', function () {
        controlsHidden.isHidden.subscribe(function (state) {
            expect(state).toBe(true);
        });
        controlsHidden.state(true);
    });
    it('Should set state to false', function () {
        controlsHidden.isHidden.subscribe(function (state) {
            expect(state).toBe(false);
        });
        controlsHidden.state(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY29udHJvbHMtaGlkZGVuLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2aWNlcy92Zy1jb250cm9scy1oaWRkZW4uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUFrQztBQUNsQywyREFBd0Q7QUFFeEQsUUFBUSxDQUFDLDBCQUEwQixFQUFFO0lBQ2pDLElBQUksY0FBZ0MsQ0FBQztJQUVyQyxVQUFVLENBQUM7UUFDUCxjQUFjLEdBQUcsSUFBSSxxQ0FBZ0IsRUFBRSxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1FBQy9CLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQVUsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUU7UUFDM0IsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1FBQzVCLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBRUgsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVmdDb250cm9sc0hpZGRlbiB9IGZyb20gJy4vdmctY29udHJvbHMtaGlkZGVuJztcblxuZGVzY3JpYmUoJ1ZnQ29udHJvbHNIaWRkZW4gU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgY29udHJvbHNIaWRkZW46IFZnQ29udHJvbHNIaWRkZW47XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29udHJvbHNIaWRkZW4gPSBuZXcgVmdDb250cm9sc0hpZGRlbigpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBwcm92aWRlIGFuIE9ic2VydmFibGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb250cm9sc0hpZGRlbi5pc0hpZGRlbikudG9FcXVhbChqYXNtaW5lLmFueShPYnNlcnZhYmxlKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIHNldCBzdGF0ZSB0byB0cnVlJywgKCkgPT4ge1xuICAgICAgICBjb250cm9sc0hpZGRlbi5pc0hpZGRlbi5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KHN0YXRlKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb250cm9sc0hpZGRlbi5zdGF0ZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgc2V0IHN0YXRlIHRvIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBjb250cm9sc0hpZGRlbi5pc0hpZGRlbi5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KHN0YXRlKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udHJvbHNIaWRkZW4uc3RhdGUoZmFsc2UpO1xuICAgIH0pO1xufSk7XG4iXX0=