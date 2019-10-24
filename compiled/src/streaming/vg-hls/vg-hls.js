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
            autoStartLoad: this.preload,
            startLevel: 4
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
                    _this.hls.startLoad();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctaGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N0cmVhbWluZy92Zy1obHMvdmctaGxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBVXVCO0FBQ3ZCLHFEQUFtRDtBQVduRDtJQWVJLGVBQW9CLEdBQWMsRUFBUyxHQUFTO1FBQWhDLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFNO1FBYjNDLGlCQUFZLEdBQTRCLEVBQUUsQ0FBQztRQUUxQyxrQkFBYSxHQUFrQyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQVM1RSxrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFFb0IsQ0FBQztJQUV4RCx3QkFBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLENBQUM7U0FDNUY7SUFDTCxDQUFDO0lBRUQsNkJBQWEsR0FBYjtRQUFBLGlCQXlDQztRQXhDRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxNQUFNLENBQUM7UUFDekUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUQs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USxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE9BQU87U0FDcEIsQ0FBQzt5Q0FnQjBCLGlCQUFVLEVBQWEsY0FBSztPQWYzQyxLQUFLLENBK0pqQjtJQUFELFlBQUM7Q0FBQSxBQS9KRCxJQStKQztBQS9KWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaVwiO1xuaW1wb3J0IHsgSUhMU0NvbmZpZyB9IGZyb20gJy4vaGxzLWNvbmZpZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJpdHJhdGVPcHRpb24gfSBmcm9tICcuLi8uLi9jb3JlL2NvcmUnO1xuXG5kZWNsYXJlIGxldCBIbHM7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3ZnSGxzXScsXG4gICAgZXhwb3J0QXM6ICd2Z0hscydcbn0pXG5leHBvcnQgY2xhc3MgVmdITFMgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSB2Z0hsczpzdHJpbmc7XG4gICAgQElucHV0KCkgdmdIbHNIZWFkZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gICAgQE91dHB1dCgpIG9uR2V0Qml0cmF0ZXM6IEV2ZW50RW1pdHRlcjxCaXRyYXRlT3B0aW9uW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgdmdGb3I6IHN0cmluZztcbiAgICB0YXJnZXQ6IGFueTtcbiAgICBobHM6IGFueTtcbiAgICBwcmVsb2FkOiBib29sZWFuO1xuICAgIGNyb3Nzb3JpZ2luOiBzdHJpbmc7XG4gICAgY29uZmlnOiBJSExTQ29uZmlnO1xuXG4gICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOkVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6VmdBUEkpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuQVBJLmlzUGxheWVyUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5BUEkucGxheWVyUmVhZHlFdmVudC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblBsYXllclJlYWR5KCkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuY3Jvc3NvcmlnaW4gPSB0aGlzLnJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnY3Jvc3NvcmlnaW4nKTtcbiAgICAgICAgdGhpcy5wcmVsb2FkID0gdGhpcy5yZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3ByZWxvYWQnKSAhPT0gJ25vbmUnO1xuICAgICAgICB0aGlzLnZnRm9yID0gdGhpcy5yZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3ZnRm9yJyk7XG5cbiAgICAgICAgaWYodGhpcy52Z0Zvcil7XG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXREZWZhdWx0TWVkaWEoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5jb25maWcgPSA8SUhMU0NvbmZpZz57XG4gICAgICAgICAgICBhdXRvU3RhcnRMb2FkOiB0aGlzLnByZWxvYWQsXG4gICAgICAgICAgICBzdGFydExldmVsOiA0XG4gICAgICAgIH07XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jb25maWcueGhyU2V0dXAgPSAoeGhyLCB1cmwpID0+IHtcbiAgICAgICAgICAgIC8vIFNlbmQgY29va2llc1xuICAgICAgICAgICAgaWYgKHRoaXMuY3Jvc3NvcmlnaW4gPT09ICd1c2UtY3JlZGVudGlhbHMnKSB7XG4gICAgICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLnZnSGxzSGVhZGVycykpIHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIHRoaXMudmdIbHNIZWFkZXJzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByZWxvYWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMuQVBJLnN1YnNjcmlwdGlvbnMucGxheS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhscykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGxzLnN0YXJ0TG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6U2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlc1sndmdIbHMnXSAmJiBjaGFuZ2VzWyd2Z0hscyddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVQbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGFuZ2VzWyd2Z0hsc0hlYWRlcnMnXSAmJiBjaGFuZ2VzWyd2Z0hsc0hlYWRlcnMnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIC8vIERvIG5vdGhpbmcuIFdlIGRvbid0IHdhbnQgdG8gY3JlYXRlIGEgb3IgZGVzdHJveSBhIHBsYXllciBpZiB0aGUgaGVhZGVycyBjaGFuZ2UuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lQbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVBsYXllcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGxzKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lQbGF5ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEl0J3MgYSBITFMgc291cmNlXG4gICAgICAgIGlmICh0aGlzLnZnSGxzICYmIHRoaXMudmdIbHMuaW5kZXhPZignbTN1OCcpID4gLTEgJiYgSGxzLmlzU3VwcG9ydGVkKCkgJiYgdGhpcy5BUEkuaXNQbGF5ZXJSZWFkeSkge1xuICAgICAgICAgICAgbGV0IHZpZGVvOkhUTUxWaWRlb0VsZW1lbnQgPSB0aGlzLnJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgICAgICB0aGlzLmhscyA9IG5ldyBIbHModGhpcy5jb25maWcpO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5obHMub24oSGxzLkV2ZW50cy5NQU5JRkVTVF9QQVJTRUQsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWRlb0xpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5sZXZlbHMubGVuZ3RoID49IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGxzLmNvbmZpZy5zdGFydExldmVsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGxzLmNvbmZpZy5zdGFydExldmVsID0gZGF0YS5sZXZlbHMubGVuZ3RoIC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmlkZW9MaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eUluZGV4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaXRyYXRlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWFUeXBlOiAndmlkZW8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdBVVRPJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBkYXRhLmxldmVscy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9MaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHlJbmRleDogKytpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogaXRlbS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGl0ZW0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IGl0ZW0uYml0cmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWRpYVR5cGU6ICd2aWRlbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGl0ZW0ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXRCaXRyYXRlcy5lbWl0KHZpZGVvTGlzdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXMuaGxzLm9uKEhscy5FdmVudHMuTEVWRUxfTE9BREVELCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuaXNMaXZlID0gZGF0YS5kZXRhaWxzLmxpdmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5obHMubG9hZFNvdXJjZSh0aGlzLnZnSGxzKTtcbiAgICAgICAgICAgIHRoaXMuaGxzLmF0dGFjaE1lZGlhKHZpZGVvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCAmJiAhIXRoaXMudGFyZ2V0LnBhdXNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5zZWVrVGltZSgwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZi5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMudmdIbHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRCaXRyYXRlKGJpdHJhdGU6IEJpdHJhdGVPcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuaGxzKSB7XG4gICAgICAgICAgICB0aGlzLmhscy5uZXh0TGV2ZWwgPSBiaXRyYXRlLnF1YWxpdHlJbmRleCAtIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95UGxheWVyKCkge1xuICAgICAgICBpZiAodGhpcy5obHMpIHtcbiAgICAgICAgICAgIHRoaXMuaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaGxzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuICAgICAgICBkZWxldGUgdGhpcy5obHM7XG4gICAgfVxufVxuIl19