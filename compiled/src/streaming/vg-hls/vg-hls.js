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
var VgHLS = /** @class */ (function () {
    function VgHLS(ref, API) {
        this.ref = ref;
        this.API = API;
        this.vgHlsHeaders = {};
        this.onGetBitrates = new core_1.EventEmitter();
        this.subscriptions = [];
    }
    VgHLS.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgHLS.prototype.onPlayerReady = function () {
        var _this = this;
        this.crossorigin = this.ref.nativeElement.getAttribute('crossorigin');
        this.preload = this.ref.nativeElement.getAttribute('preload') !== 'none';
        this.vgFor = this.ref.nativeElement.getAttribute('vgFor');
        if (this.vgFor) {
            this.target = this.API.getMediaById(this.vgFor);
        }
        else {
            this.target = this.API.getDefaultMedia();
        }
        this.config = {
            autoStartLoad: this.preload
        };
        // @ts-ignore
        this.config.xhrSetup = function (xhr, url) {
            // Send cookies
            if (_this.crossorigin === 'use-credentials') {
                xhr.withCredentials = true;
            }
            for (var _i = 0, _a = Object.keys(_this.vgHlsHeaders); _i < _a.length; _i++) {
                var key = _a[_i];
                xhr.setRequestHeader(key, _this.vgHlsHeaders[key]);
            }
        };
        this.createPlayer();
        if (!this.preload) {
            this.subscriptions.push(this.API.subscriptions.play.subscribe(function () {
                if (_this.hls) {
                    _this.hls.startLoad(0);
                }
            }));
        }
    };
    VgHLS.prototype.ngOnChanges = function (changes) {
        if (changes['vgHls'] && changes['vgHls'].currentValue) {
            this.createPlayer();
        }
        else if (changes['vgHlsHeaders'] && changes['vgHlsHeaders'].currentValue) {
            // Do nothing. We don't want to create a or destroy a player if the headers change.
        }
        else {
            this.destroyPlayer();
        }
    };
    VgHLS.prototype.createPlayer = function () {
        var _this = this;
        if (this.hls) {
            this.destroyPlayer();
        }
        // It's a HLS source
        if (this.vgHls && this.vgHls.indexOf('m3u8') > -1 && Hls.isSupported() && this.API.isPlayerReady) {
            var video = this.ref.nativeElement;
            this.hls = new Hls(this.config);
            // @ts-ignore
            this.hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                var videoList = [];
                if (data.levels.length >= 5) {
                    _this.hls.config.startLevel = 4;
                }
                else {
                    _this.hls.config.startLevel = data.levels.length - 1;
                }
                console.log('******************** this.hls ********************');
                console.log(_this.hls);
                console.log('************************************************');
                console.log('******************** event ********************');
                console.log(event);
                console.log('************************************************');
                console.log('******************** data ********************');
                console.log(data);
                console.log('************************************************');
                videoList.push({
                    qualityIndex: 0,
                    width: 0,
                    height: 0,
                    bitrate: 0,
                    mediaType: 'video',
                    label: 'AUTO'
                });
                data.levels.forEach(function (item, index) {
                    videoList.push({
                        qualityIndex: ++index,
                        width: item.width,
                        height: item.height,
                        bitrate: item.bitrate,
                        mediaType: 'video',
                        label: item.name
                    });
                });
                _this.onGetBitrates.emit(videoList);
            });
            // @ts-ignore
            this.hls.on(Hls.Events.LEVEL_LOADED, function (event, data) {
                _this.target.isLive = data.details.live;
            });
            this.hls.loadSource(this.vgHls);
            this.hls.attachMedia(video);
        }
        else {
            if (this.target && !!this.target.pause) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.vgHls;
            }
        }
    };
    VgHLS.prototype.setBitrate = function (bitrate) {
        if (this.hls) {
            this.hls.nextLevel = bitrate.qualityIndex - 1;
        }
    };
    VgHLS.prototype.destroyPlayer = function () {
        if (this.hls) {
            this.hls.destroy();
            this.hls = null;
        }
    };
    VgHLS.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        this.destroyPlayer();
        delete this.hls;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VgHLS.prototype, "vgHls", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VgHLS.prototype, "vgHlsHeaders", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VgHLS.prototype, "onGetBitrates", void 0);
    VgHLS = __decorate([
        core_1.Directive({
            selector: '[vgHls]',
            exportAs: 'vgHls'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgHLS);
    return VgHLS;
}());
exports.VgHLS = VgHLS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctaGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N0cmVhbWluZy92Zy1obHMvdmctaGxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBVXVCO0FBQ3ZCLHFEQUFtRDtBQVduRDtJQWVJLGVBQW9CLEdBQWMsRUFBUyxHQUFTO1FBQWhDLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFNO1FBYjNDLGlCQUFZLEdBQTRCLEVBQUUsQ0FBQztRQUUxQyxrQkFBYSxHQUFrQyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQVM1RSxrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFFb0IsQ0FBQztJQUV4RCx3QkFBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLENBQUM7U0FDNUY7SUFDTCxDQUFDO0lBRUQsNkJBQWEsR0FBYjtRQUFBLGlCQXdDQztRQXZDRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxNQUFNLENBQUM7UUFDekUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUQs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Q0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRCwyQkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBcktRO1FBQVIsWUFBSyxFQUFFOzt3Q0FBYztJQUNiO1FBQVIsWUFBSyxFQUFFOzsrQ0FBNEM7SUFFMUM7UUFBVCxhQUFNLEVBQUU7a0NBQWdCLG1CQUFZO2dEQUF1QztJQUpuRSxLQUFLO1FBSmpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsT0FBTztTQUNwQixDQUFDO3lDQWdCMEIsaUJBQVUsRUFBYSxjQUFLO09BZjNDLEtBQUssQ0F1S2pCO0lBQUQsWUFBQztDQUFBLEFBdktELElBdUtDO0FBdktZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvdmctYXBpXCI7XG5pbXBvcnQgeyBJSExTQ29uZmlnIH0gZnJvbSAnLi9obHMtY29uZmlnJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQml0cmF0ZU9wdGlvbiB9IGZyb20gJy4uLy4uL2NvcmUvY29yZSc7XG5cbmRlY2xhcmUgbGV0IEhscztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdmdIbHNdJyxcbiAgICBleHBvcnRBczogJ3ZnSGxzJ1xufSlcbmV4cG9ydCBjbGFzcyBWZ0hMUyBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHZnSGxzOnN0cmluZztcbiAgICBASW5wdXQoKSB2Z0hsc0hlYWRlcnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG5cbiAgICBAT3V0cHV0KCkgb25HZXRCaXRyYXRlczogRXZlbnRFbWl0dGVyPEJpdHJhdGVPcHRpb25bXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICB2Z0Zvcjogc3RyaW5nO1xuICAgIHRhcmdldDogYW55O1xuICAgIGhsczogYW55O1xuICAgIHByZWxvYWQ6IGJvb2xlYW47XG4gICAgY3Jvc3NvcmlnaW46IHN0cmluZztcbiAgICBjb25maWc6IElITFNDb25maWc7XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6RWxlbWVudFJlZiwgcHVibGljIEFQSTpWZ0FQSSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuaXNQbGF5ZXJSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy5jcm9zc29yaWdpbiA9IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjcm9zc29yaWdpbicpO1xuICAgICAgICB0aGlzLnByZWxvYWQgPSB0aGlzLnJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgncHJlbG9hZCcpICE9PSAnbm9uZSc7XG4gICAgICAgIHRoaXMudmdGb3IgPSB0aGlzLnJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgndmdGb3InKTtcblxuICAgICAgICBpZih0aGlzLnZnRm9yKXtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5BUEkuZ2V0TWVkaWFCeUlkKHRoaXMudmdGb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldERlZmF1bHRNZWRpYSgpO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLmNvbmZpZyA9IDxJSExTQ29uZmlnPntcbiAgICAgICAgICAgIGF1dG9TdGFydExvYWQ6IHRoaXMucHJlbG9hZFxuICAgICAgICB9O1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY29uZmlnLnhoclNldHVwID0gKHhociwgdXJsKSA9PiB7XG4gICAgICAgICAgICAvLyBTZW5kIGNvb2tpZXNcbiAgICAgICAgICAgIGlmICh0aGlzLmNyb3Nzb3JpZ2luID09PSAndXNlLWNyZWRlbnRpYWxzJykge1xuICAgICAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy52Z0hsc0hlYWRlcnMpKSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCB0aGlzLnZnSGxzSGVhZGVyc1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcigpO1xuXG4gICAgICAgIGlmICghdGhpcy5wcmVsb2FkKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICB0aGlzLkFQSS5zdWJzY3JpcHRpb25zLnBsYXkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5obHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhscy5zdGFydExvYWQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczpTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzWyd2Z0hscyddICYmIGNoYW5nZXNbJ3ZnSGxzJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoYW5nZXNbJ3ZnSGxzSGVhZGVycyddICYmIGNoYW5nZXNbJ3ZnSGxzSGVhZGVycyddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgLy8gRG8gbm90aGluZy4gV2UgZG9uJ3Qgd2FudCB0byBjcmVhdGUgYSBvciBkZXN0cm95IGEgcGxheWVyIGlmIHRoZSBoZWFkZXJzIGNoYW5nZS5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUGxheWVyKCkge1xuICAgICAgICBpZiAodGhpcy5obHMpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXQncyBhIEhMUyBzb3VyY2VcbiAgICAgICAgaWYgKHRoaXMudmdIbHMgJiYgdGhpcy52Z0hscy5pbmRleE9mKCdtM3U4JykgPiAtMSAmJiBIbHMuaXNTdXBwb3J0ZWQoKSAmJiB0aGlzLkFQSS5pc1BsYXllclJlYWR5KSB7XG4gICAgICAgICAgICBsZXQgdmlkZW86SFRNTFZpZGVvRWxlbWVudCA9IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHRoaXMuaGxzID0gbmV3IEhscyh0aGlzLmNvbmZpZyk7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0aGlzLmhscy5vbihIbHMuRXZlbnRzLk1BTklGRVNUX1BBUlNFRCwgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvTGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmxldmVscy5sZW5ndGggPj0gNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5obHMuY29uZmlnLnN0YXJ0TGV2ZWwgPSA0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5obHMuY29uZmlnLnN0YXJ0TGV2ZWwgPSBkYXRhLmxldmVscy5sZW5ndGggLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqIHRoaXMuaGxzICoqKioqKioqKioqKioqKioqKioqJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGxzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKiogZXZlbnQgKioqKioqKioqKioqKioqKioqKionKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKioqKiBkYXRhICoqKioqKioqKioqKioqKioqKioqJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmlkZW9MaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eUluZGV4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaXRyYXRlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWFUeXBlOiAndmlkZW8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdBVVRPJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBkYXRhLmxldmVscy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9MaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHlJbmRleDogKytpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogaXRlbS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGl0ZW0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IGl0ZW0uYml0cmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWRpYVR5cGU6ICd2aWRlbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGl0ZW0ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXRCaXRyYXRlcy5lbWl0KHZpZGVvTGlzdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXMuaGxzLm9uKEhscy5FdmVudHMuTEVWRUxfTE9BREVELCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuaXNMaXZlID0gZGF0YS5kZXRhaWxzLmxpdmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5obHMubG9hZFNvdXJjZSh0aGlzLnZnSGxzKTtcbiAgICAgICAgICAgIHRoaXMuaGxzLmF0dGFjaE1lZGlhKHZpZGVvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAmJiAhIXRoaXMudGFyZ2V0LnBhdXNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5zZWVrVGltZSgwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZi5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMudmdIbHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRCaXRyYXRlKGJpdHJhdGU6IEJpdHJhdGVPcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuaGxzKSB7XG4gICAgICAgICAgICB0aGlzLmhscy5uZXh0TGV2ZWwgPSBiaXRyYXRlLnF1YWxpdHlJbmRleCAtIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95UGxheWVyKCkge1xuICAgICAgICBpZiAodGhpcy5obHMpIHtcbiAgICAgICAgICAgIHRoaXMuaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaGxzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuICAgICAgICBkZWxldGUgdGhpcy5obHM7XG4gICAgfVxufVxuIl19