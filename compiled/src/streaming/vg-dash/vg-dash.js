"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var vg_api_1 = require("../../core/services/vg-api");
var VgDASH = /** @class */ (function () {
    function VgDASH(ref, API) {
        this.ref = ref;
        this.API = API;
        this.onGetBitrates = new core_1.EventEmitter();
        this.subscriptions = [];
    }
    VgDASH.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgDASH.prototype.onPlayerReady = function () {
        this.vgFor = this.ref.nativeElement.getAttribute('vgFor');
        this.target = this.API.getMediaById(this.vgFor);
        this.createPlayer();
    };
    VgDASH.prototype.ngOnChanges = function (changes) {
        if (changes['vgDash'] && changes['vgDash'].currentValue) {
            this.createPlayer();
        }
        else {
            this.destroyPlayer();
        }
    };
    VgDASH.prototype.createPlayer = function () {
        var _this = this;
        if (this.dash) {
            this.destroyPlayer();
        }
        // It's a DASH source
        if (this.vgDash && ((this.vgDash.indexOf('.mpd') > -1) ||
            (this.vgDash.indexOf('mpd-time-csf') > -1))) {
            var drmOptions = void 0;
            if (this.vgDRMLicenseServer) {
                drmOptions = this.vgDRMLicenseServer;
                if (this.vgDRMToken) {
                    for (var drmServer in drmOptions) {
                        if (drmServer.hasOwnProperty(drmServer)) {
                            drmOptions[drmServer].httpRequestHeaders = { Authorization: this.vgDRMToken };
                        }
                    }
                }
            }
            this.dash = dashjs.MediaPlayer().create();
            this.dash.getDebug().setLogToBrowserConsole(false);
            this.dash.initialize(this.ref.nativeElement);
            this.dash.setInitialBitrateFor('video', 15000);
            this.dash.setAutoPlay(true);
            this.dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function () {
                var audioList = _this.dash.getBitrateInfoListFor('audio');
                var videoList = _this.dash.getBitrateInfoListFor('video');
                if (audioList.length > 1) {
                    audioList.forEach(function (item) { return item.qualityIndex = ++item.qualityIndex; });
                    audioList.unshift({
                        qualityIndex: 0,
                        width: 0,
                        height: 0,
                        bitrate: 0,
                        mediaType: 'video',
                        label: 'AUTO'
                    });
                    _this.onGetBitrates.emit(audioList);
                }
                if (videoList.length > 1) {
                    videoList.forEach(function (item) { return item.qualityIndex = ++item.qualityIndex; });
                    videoList.unshift({
                        qualityIndex: 0,
                        width: 0,
                        height: 0,
                        bitrate: 0,
                        mediaType: 'video',
                        label: 'AUTO'
                    });
                    _this.onGetBitrates.emit(videoList);
                }
            });
            if (drmOptions) {
                this.dash.setProtectionData(drmOptions);
            }
            this.dash.attachSource(this.vgDash);
        }
        else {
            if (this.target) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.vgDash;
            }
        }
    };
    VgDASH.prototype.setBitrate = function (bitrate) {
        if (this.dash) {
            if (bitrate.qualityIndex > 0) {
                if (this.dash.getAutoSwitchQualityFor(bitrate.mediaType)) {
                    this.dash.setAutoSwitchQualityFor(bitrate.mediaType, false);
                }
                var nextIndex = bitrate.qualityIndex - 1;
                this.dash.setQualityFor(bitrate.mediaType, nextIndex);
            }
            else {
                this.dash.setAutoSwitchQualityFor(bitrate.mediaType, true);
            }
        }
    };
    VgDASH.prototype.destroyPlayer = function () {
        if (this.dash) {
            this.dash.reset();
            this.dash = null;
        }
    };
    VgDASH.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        this.destroyPlayer();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VgDASH.prototype, "vgDash", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VgDASH.prototype, "vgDRMToken", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VgDASH.prototype, "vgDRMLicenseServer", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VgDASH.prototype, "onGetBitrates", void 0);
    VgDASH = __decorate([
        core_1.Directive({
            selector: '[vgDash]',
            exportAs: 'vgDash'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgDASH);
    return VgDASH;
}());
exports.VgDASH = VgDASH;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctZGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdHJlYW1pbmcvdmctZGFzaC92Zy1kYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBVXVCO0FBQ3ZCLHFEQUFtRDtBQVduRDtJQWFJLGdCQUFvQixHQUFjLEVBQVMsR0FBUztRQUFoQyxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBTTtRQVIxQyxrQkFBYSxHQUFrQyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU01RSxrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFFb0IsQ0FBQztJQUV4RCx5QkFBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLENBQUM7U0FDNUY7SUFDTCxDQUFDO0lBRUQsOEJBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsNEJBQVcsR0FBWCxVQUFZLE9BQXFCO1FBQzdCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZ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QUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM5RDtTQUNKO0lBQ0wsQ0FBQztJQUVELDhCQUFhLEdBQWI7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELDRCQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQTdJUTtRQUFSLFlBQUssRUFBRTs7MENBQWU7SUFDZDtRQUFSLFlBQUssRUFBRTs7OENBQW1CO0lBQ2xCO1FBQVIsWUFBSyxFQUFFOztzREFBc0M7SUFFcEM7UUFBVCxhQUFNLEVBQUU7a0NBQWdCLG1CQUFZO2lEQUF1QztJQUxuRSxNQUFNO1FBSmxCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsUUFBUTtTQUNyQixDQUFDO3lDQWMwQixpQkFBVSxFQUFhLGNBQUs7T0FiM0MsTUFBTSxDQStJbEI7SUFBRCxhQUFDO0NBQUEsQUEvSUQsSUErSUM7QUEvSVksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElEUk1MaWNlbnNlU2VydmVyIH0gZnJvbSAnLi4vc3RyZWFtaW5nJztcbmltcG9ydCB7IEJpdHJhdGVPcHRpb24gfSBmcm9tICcuLi8uLi9jb3JlL2NvcmUnO1xuXG5kZWNsYXJlIGxldCBkYXNoanM7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3ZnRGFzaF0nLFxuICAgIGV4cG9ydEFzOiAndmdEYXNoJ1xufSlcbmV4cG9ydCBjbGFzcyBWZ0RBU0ggaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSB2Z0Rhc2g6c3RyaW5nO1xuICAgIEBJbnB1dCgpIHZnRFJNVG9rZW46c3RyaW5nO1xuICAgIEBJbnB1dCgpIHZnRFJNTGljZW5zZVNlcnZlcjpJRFJNTGljZW5zZVNlcnZlcjtcblxuICAgIEBPdXRwdXQoKSBvbkdldEJpdHJhdGVzOiBFdmVudEVtaXR0ZXI8Qml0cmF0ZU9wdGlvbltdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHZnRm9yOiBzdHJpbmc7XG4gICAgdGFyZ2V0OiBhbnk7XG4gICAgZGFzaDphbnk7XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6RWxlbWVudFJlZiwgcHVibGljIEFQSTpWZ0FQSSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuaXNQbGF5ZXJSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy52Z0ZvciA9IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2Z0ZvcicpO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcbiAgICAgICAgdGhpcy5jcmVhdGVQbGF5ZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOlNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3ZnRGFzaCddICYmIGNoYW5nZXNbJ3ZnRGFzaCddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVQbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUGxheWVyKCkge1xuICAgICAgICBpZiAodGhpcy5kYXNoKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lQbGF5ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEl0J3MgYSBEQVNIIHNvdXJjZVxuICAgICAgICBpZiAodGhpcy52Z0Rhc2ggJiYgKFxuICAgICAgICAgICAgKHRoaXMudmdEYXNoLmluZGV4T2YoJy5tcGQnKSA+IC0xKSB8fFxuICAgICAgICAgICAgKHRoaXMudmdEYXNoLmluZGV4T2YoJ21wZC10aW1lLWNzZicpID4gLTEpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGxldCBkcm1PcHRpb25zO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52Z0RSTUxpY2Vuc2VTZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICBkcm1PcHRpb25zID0gdGhpcy52Z0RSTUxpY2Vuc2VTZXJ2ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy52Z0RSTVRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGRybVNlcnZlciBpbiBkcm1PcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkcm1TZXJ2ZXIuaGFzT3duUHJvcGVydHkoZHJtU2VydmVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRybU9wdGlvbnNbZHJtU2VydmVyXS5odHRwUmVxdWVzdEhlYWRlcnMgPSB7IEF1dGhvcml6YXRpb246IHRoaXMudmdEUk1Ub2tlbiB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5kYXNoLmluaXRpYWxpemUodGhpcy5yZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmRhc2guc2V0SW5pdGlhbEJpdHJhdGVGb3IoJ3ZpZGVvJywgMTUwMDApO1xuICAgICAgICAgICAgdGhpcy5kYXNoLnNldEF1dG9QbGF5KHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLmRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5TVFJFQU1fSU5JVElBTElaRUQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhdWRpb0xpc3QgPSB0aGlzLmRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCdhdWRpbycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvTGlzdCA9IHRoaXMuZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYXVkaW9MaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXVkaW9MaXN0LmZvckVhY2goaXRlbSA9PiBpdGVtLnF1YWxpdHlJbmRleCA9ICsraXRlbS5xdWFsaXR5SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBhdWRpb0xpc3QudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5SW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZWRpYVR5cGU6ICd2aWRlbycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ0FVVE8nXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXRCaXRyYXRlcy5lbWl0KGF1ZGlvTGlzdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvTGlzdC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5xdWFsaXR5SW5kZXggPSArK2l0ZW0ucXVhbGl0eUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9MaXN0LnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eUluZGV4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaXRyYXRlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWFUeXBlOiAndmlkZW8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdBVVRPJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0Qml0cmF0ZXMuZW1pdCh2aWRlb0xpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoZHJtT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGFzaC5zZXRQcm90ZWN0aW9uRGF0YShkcm1PcHRpb25zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kYXNoLmF0dGFjaFNvdXJjZSh0aGlzLnZnRGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNlZWtUaW1lKDApO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy52Z0Rhc2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRCaXRyYXRlKGJpdHJhdGU6IEJpdHJhdGVPcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuZGFzaCkge1xuICAgICAgICAgICAgaWYgKGJpdHJhdGUucXVhbGl0eUluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoYml0cmF0ZS5tZWRpYVR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihiaXRyYXRlLm1lZGlhVHlwZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJbmRleCA9IGJpdHJhdGUucXVhbGl0eUluZGV4IC0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhc2guc2V0UXVhbGl0eUZvcihiaXRyYXRlLm1lZGlhVHlwZSwgbmV4dEluZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGJpdHJhdGUubWVkaWFUeXBlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lQbGF5ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhc2gpIHtcbiAgICAgICAgICAgIHRoaXMuZGFzaC5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5kYXNoID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuICAgIH1cbn1cbiJdfQ==