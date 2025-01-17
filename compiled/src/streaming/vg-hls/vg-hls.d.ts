import { ElementRef, SimpleChanges, OnChanges, OnDestroy, OnInit, EventEmitter } from "@angular/core";
import { VgAPI } from "../../core/services/vg-api";
import { IHLSConfig } from './hls-config';
import { Subscription } from 'rxjs';
import { BitrateOption } from '../../core/core';
export declare class VgHLS implements OnInit, OnChanges, OnDestroy {
    private ref;
    API: VgAPI;
    vgHls: string;
    vgHlsHeaders: {
        [key: string]: string;
    };
    onGetBitrates: EventEmitter<BitrateOption[]>;
    vgFor: string;
    target: any;
    hls: any;
    preload: boolean;
    crossorigin: string;
    config: IHLSConfig;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    ngOnChanges(changes: SimpleChanges): void;
    createPlayer(): void;
    setBitrate(bitrate: BitrateOption): void;
    destroyPlayer(): void;
    ngOnDestroy(): void;
}
