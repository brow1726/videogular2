import { ElementRef, OnChanges, OnDestroy, OnInit, DoCheck, SimpleChange } from '@angular/core';
import { VgAPI } from '../../../core/services/vg-api';
import { Subscription } from 'rxjs';
export declare class VgScrubBarCuePoints implements OnInit, OnChanges, OnDestroy, DoCheck {
    API: VgAPI;
    vgCuePoints: TextTrackCueList;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    onLoadedMetadataCalled: boolean;
    cuePoints: Array<any>;
    subscriptions: Subscription[];
    totalCues: number;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    onLoadedMetadata(): void;
    updateCuePoints(): void;
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
}
