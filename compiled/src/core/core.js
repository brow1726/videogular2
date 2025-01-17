"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var vg_player_1 = require("./vg-player/vg-player");
var vg_media_1 = require("./vg-media/vg-media");
var vg_cue_points_1 = require("./vg-cue-points/vg-cue-points");
var vg_api_1 = require("./services/vg-api");
var vg_fullscreen_api_1 = require("./services/vg-fullscreen-api");
var vg_utils_1 = require("./services/vg-utils");
var vg_controls_hidden_1 = require("./services/vg-controls-hidden");
// components
__export(require("./vg-player/vg-player"));
__export(require("./vg-media/vg-media"));
__export(require("./vg-cue-points/vg-cue-points"));
// services
__export(require("./services/vg-api"));
__export(require("./services/vg-fullscreen-api"));
__export(require("./services/vg-utils"));
__export(require("./services/vg-controls-hidden"));
// types
__export(require("./events/vg-events"));
__export(require("./states/vg-states"));
// utility classes
__export(require("./vg-media/vg-media-element"));
/**
 * @internal
 */
function coreDirectives() {
    return [
        vg_player_1.VgPlayer, vg_media_1.VgMedia, vg_cue_points_1.VgCuePoints
    ];
}
exports.coreDirectives = coreDirectives;
function coreServices() {
    return [
        vg_api_1.VgAPI, vg_fullscreen_api_1.VgFullscreenAPI, vg_utils_1.VgUtils, vg_controls_hidden_1.VgControlsHidden
    ];
}
exports.coreServices = coreServices;
var VgCoreModule = /** @class */ (function () {
    function VgCoreModule() {
    }
    VgCoreModule = __decorate([
        core_1.NgModule({
            declarations: coreDirectives(),
            exports: coreDirectives(),
            providers: coreServices()
        })
    ], VgCoreModule);
    return VgCoreModule;
}());
exports.VgCoreModule = VgCoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUQ7QUFDbkQsbURBQWlEO0FBQ2pELGdEQUE4QztBQUM5QywrREFBNEQ7QUFDNUQsNENBQTBDO0FBQzFDLGtFQUErRDtBQUMvRCxnREFBOEM7QUFDOUMsb0VBQWlFO0FBR2pFLGFBQWE7QUFDYiwyQ0FBc0M7QUFDdEMseUNBQW9DO0FBQ3BDLG1EQUE4QztBQUU5QyxXQUFXO0FBQ1gsdUNBQWtDO0FBQ2xDLGtEQUE2QztBQUM3Qyx5Q0FBb0M7QUFDcEMsbURBQThDO0FBRTlDLFFBQVE7QUFDUix3Q0FBbUM7QUFDbkMsd0NBQW1DO0FBS25DLGtCQUFrQjtBQUNsQixpREFBNEM7QUFXNUM7O0dBRUc7QUFDSCxTQUFnQixjQUFjO0lBQzFCLE9BQU87UUFDSCxvQkFBUSxFQUFFLGtCQUFPLEVBQUUsMkJBQVc7S0FDakMsQ0FBQztBQUNOLENBQUM7QUFKRCx3Q0FJQztBQUVELFNBQWdCLFlBQVk7SUFDeEIsT0FBTztRQUNILGNBQUssRUFBRSxtQ0FBZSxFQUFFLGtCQUFPLEVBQUUscUNBQWdCO0tBQ3BELENBQUM7QUFDTixDQUFDO0FBSkQsb0NBSUM7QUFPRDtJQUFBO0lBQ0EsQ0FBQztJQURZLFlBQVk7UUFMeEIsZUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFLGNBQWMsRUFBRTtZQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFO1lBQ3pCLFNBQVMsRUFBRSxZQUFZLEVBQUU7U0FDNUIsQ0FBQztPQUNXLFlBQVksQ0FDeEI7SUFBRCxtQkFBQztDQUFBLEFBREQsSUFDQztBQURZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZ1BsYXllciB9IGZyb20gJy4vdmctcGxheWVyL3ZnLXBsYXllcic7XG5pbXBvcnQgeyBWZ01lZGlhIH0gZnJvbSAnLi92Zy1tZWRpYS92Zy1tZWRpYSc7XG5pbXBvcnQgeyBWZ0N1ZVBvaW50cyB9IGZyb20gJy4vdmctY3VlLXBvaW50cy92Zy1jdWUtcG9pbnRzJztcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSAnLi9zZXJ2aWNlcy92Zy1hcGknO1xuaW1wb3J0IHsgVmdGdWxsc2NyZWVuQVBJIH0gZnJvbSAnLi9zZXJ2aWNlcy92Zy1mdWxsc2NyZWVuLWFwaSc7XG5pbXBvcnQgeyBWZ1V0aWxzIH0gZnJvbSAnLi9zZXJ2aWNlcy92Zy11dGlscyc7XG5pbXBvcnQgeyBWZ0NvbnRyb2xzSGlkZGVuIH0gZnJvbSAnLi9zZXJ2aWNlcy92Zy1jb250cm9scy1oaWRkZW4nO1xuXG5cbi8vIGNvbXBvbmVudHNcbmV4cG9ydCAqIGZyb20gJy4vdmctcGxheWVyL3ZnLXBsYXllcic7XG5leHBvcnQgKiBmcm9tICcuL3ZnLW1lZGlhL3ZnLW1lZGlhJztcbmV4cG9ydCAqIGZyb20gJy4vdmctY3VlLXBvaW50cy92Zy1jdWUtcG9pbnRzJztcblxuLy8gc2VydmljZXNcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvdmctYXBpJztcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvdmctZnVsbHNjcmVlbi1hcGknO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy92Zy11dGlscyc7XG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL3ZnLWNvbnRyb2xzLWhpZGRlbic7XG5cbi8vIHR5cGVzXG5leHBvcnQgKiBmcm9tICcuL2V2ZW50cy92Zy1ldmVudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9zdGF0ZXMvdmctc3RhdGVzJztcblxuLy8gaW50ZXJmYWNlc1xuZXhwb3J0ICogZnJvbSAnLi92Zy1tZWRpYS9pLW1lZGlhLWVsZW1lbnQnO1xuXG4vLyB1dGlsaXR5IGNsYXNzZXNcbmV4cG9ydCAqIGZyb20gJy4vdmctbWVkaWEvdmctbWVkaWEtZWxlbWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQml0cmF0ZU9wdGlvbiB7XG4gICAgcXVhbGl0eUluZGV4OiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICBiaXRyYXRlOiBudW1iZXI7XG4gICAgbWVkaWFUeXBlOiBzdHJpbmc7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3JlRGlyZWN0aXZlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBWZ1BsYXllciwgVmdNZWRpYSwgVmdDdWVQb2ludHNcbiAgICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29yZVNlcnZpY2VzKCk6IFByb3ZpZGVyW10ge1xuICAgIHJldHVybiBbXG4gICAgICAgIFZnQVBJLCBWZ0Z1bGxzY3JlZW5BUEksIFZnVXRpbHMsIFZnQ29udHJvbHNIaWRkZW5cbiAgICBdO1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogY29yZURpcmVjdGl2ZXMoKSxcbiAgICBleHBvcnRzOiBjb3JlRGlyZWN0aXZlcygpLFxuICAgIHByb3ZpZGVyczogY29yZVNlcnZpY2VzKClcbn0pXG5leHBvcnQgY2xhc3MgVmdDb3JlTW9kdWxlIHtcbn1cbiJdfQ==