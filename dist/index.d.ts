export declare class CcSwiper extends ChuciElement {
    private static activeViewerOwner;
    private currentIndex;
    private timer?;
    private observer?;
    private drag?;
    private dragFrame?;
    private readonly panelPositions;
    private width;
    private pointerHandlers?;
    private slidesObserver?;
    private observedSlides;
    private viewerOpen;
    private readonly thumbnailQueue;
    private readonly thumbnailSources;
    private readonly pendingThumbnails;
    private readonly thumbnailTargets;
    private stopHostPropagation;
    static get observedAttributes(): string[];
    get hasThumb(): boolean;
    get autoplay(): boolean;
    get items(): MediaItem[];
    get slides(): Element[];
    get index(): number;
    get loop(): boolean;
    protected viewerTagName(): string;
    protected setThumbnailSource(index: number, src: string, slide?: Element, key?: string): void;
    protected render(): void;
    private cleanup;
    disconnectedCallback(): void;
    private buildSlides;
    private resetThumbnailSources;
    private releaseThumbnailSources;
    private revokeThumbnailUrl;
    private requestThumbnails;
    private updateThumbnailPriorities;
    private bindEvents;
    private onKeyDown;
    private onViewerIndexChange;
    private onViewerClose;
    private onPointerDown;
    private onPointerMove;
    private cancelDragFrame;
    private onPointerUp;
    private displayDragPx;
    private observeSlides;
    private observeSize;
    private updateLayout;
    private setPanelPosition;
    private updateChrome;
    private finishSwipeTransition;
    private commitSwipe;
    goTo(index: number, opts?: {
        animate?: boolean;
    }): void;
    pauseAutoplay(): void;
    resumeAutoplay(): void;
    private startAutoplay;
    openViewer(index: number): Promise<void>;
}

export declare class CcSwiperSlide extends ChuciElement {
    static get observedAttributes(): string[];
    get thumbnailUrl(): string;
    get imageUrl(): string;
    get imageType(): string;
    get caption(): string;
    protected render(): void;
}

export declare class CcViewer extends ChuciElement {
    private items;
    private currentIndex;
    private loop;
    private activeMount?;
    private barVisibility?;
    private gestures?;
    private debugTimer?;
    private previousFocus?;
    get index(): number;
    open(items: MediaItem[], index: number, opts?: {
        loop?: boolean;
    }): void;
    close(): void;
    disconnectedCallback(): void;
    protected firstUpdated(): void;
    protected render(): void;
    private readonly onKeyDown;
    private step;
    private goTo;
    private readonly setBarVisible;
    private showItem;
    private mountRenderer;
    private reportRendererError;
    private refreshDebug;
    private clearRenderer;
}

/**
 * Base class for Chuci web components without Lit dependency
 */
export declare abstract class ChuciElement extends HTMLElement {
    private _shadowRoot;
    private _connected;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void;
    protected firstUpdated(): void;
    protected abstract render(): void;
    protected html(strings: TemplateStringsArray, ...values: any[]): string;
    protected css(strings: TemplateStringsArray, ...values: any[]): string;
    protected updateShadowRoot(content: string): void;
    protected query<T extends HTMLElement>(selector: string): T | null;
    protected queryAll<T extends HTMLElement>(selector: string): NodeListOf<T>;
    protected dispatch(eventName: string, detail?: any): void;
}

export declare function escapeCssUrl(value: string): string;

declare interface GenerateOptions {
    maxSize?: number;
    signal?: AbortSignal;
}

/** Generate a thumbnail with the same initial scene setup used by the viewer. */
export declare function generateThumbnail(item: MediaItem, opts?: GenerateOptions): Promise<Blob>;

export declare interface MediaItem {
    url: string;
    type: MediaType;
    thumbnailUrl: string;
    caption: string;
    materialUrl?: string;
    cameraPosition?: string;
    cameraTarget?: string;
    showTexture?: boolean;
    fitToContainer: boolean;
    debugMode: boolean;
}

/**
 * メディア項目の型と、スライド要素からの読み取り。
 *
 * 読む属性は既存のスライドのものだけ（global-constraints）：
 * image-url / image-type / thumbnail-url / caption / material-url /
 * camera-position / camera-target / show-texture / fit-to-container / debug-mode
 */
export declare type MediaType = 'image' | 'panorama' | 'youtube' | 'video' | '3dmodel' | 'gaussian';

/**
 * スライド要素からメディア項目を読み取る。
 *
 * - `image-type` は既知の 6 種類以外を `image` に落とす（今と同じ）。
 * - `fit-to-container` と `debug-mode` は属性の有無で判定する（値が空文字でも true）。
 * - `show-texture` は属性がなければ undefined、値が 'false' のときだけ false、それ以外は true。
 * - 任意項目（material-url / camera-position / camera-target）は属性がなければ undefined。
 */
export declare function readMediaItem(el: Element): MediaItem;

export declare const THUMBNAIL_GENERATOR_VERSION = 2;

export { }


declare global {
    interface HTMLElementTagNameMap {
        "cc-swiper": CcSwiper;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "cc-viewer": CcViewer;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'cc-swiper-slide': CcSwiperSlide;
    }
}
