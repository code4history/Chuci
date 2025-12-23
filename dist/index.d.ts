export declare class CcSwiper extends ChuciElement {
    private slider?;
    private divContainer?;
    private divSlides?;
    private divGallery?;
    private divPagination?;
    private divPrevious?;
    private divNext?;
    static get observedAttributes(): string[];
    get hasThumb(): boolean;
    get autoplay(): boolean;
    get slides(): CcSwiperSlide[];
    openViewer(imageUrl: string, imageType: string, slideIndex?: number): Promise<void>;
    protected firstUpdated(): void;
    protected render(): void;
    private initializeSwiper;
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
    private swiper;
    private currentSlideIndex;
    private currentType;
    private boundHandleNavigatePrev?;
    private boundHandleNavigateNext?;
    open(imgUrl: string, type: string, attributes?: Record<string, any>): void;
    protected firstUpdated(): void;
    private handleNavigatePrev;
    private handleNavigateNext;
    private navigateToSlide;
    private updateNavigationButtons;
    private setNavigationVisibility;
    setSwiper(swiper: any): void;
    setCurrentSlideIndex(index: number): void;
    protected render(): void;
}

export declare class CcViewer3DModel extends CcViewerBase {
    private modelUrl;
    private materialUrl;
    private debugMode;
    private cameraPosition;
    private cameraTarget;
    private showTexture;
    private scene?;
    private camera?;
    private renderer?;
    private controls?;
    private animationId?;
    private container?;
    private currentModel?;
    private originalMaterials;
    private resizeObserver?;
    private externalCanvas?;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    protected doOpen(url: string): Promise<void>;
    protected doClose(): void;
    protected getViewerContent(): string;
    protected getCustomStyles(): string;
    protected onAfterRender(): void;
    private cleanup;
    private storeOriginalMaterials;
    private toggleTexture;
    private getCameraDebugInfo;
    private getTargetDebugInfo;
    private updateDebugInfo;
    private initializeViewer;
    private loadModel;
    private animateLoop;
    private handleResize;
}

export declare abstract class CcViewerBase extends ChuciElement {
    private _showPrevButton;
    private _showNextButton;
    protected isShow: boolean;
    protected isLoading: boolean;
    get showPrevButton(): boolean;
    set showPrevButton(value: boolean);
    get showNextButton(): boolean;
    set showNextButton(value: boolean);
    protected abstract doOpen(url: string): void | Promise<void>;
    protected abstract doClose(): void;
    protected abstract getViewerContent(): string;
    open(url: string): void;
    close(): void;
    protected cleanupNavigationListeners(): void;
    protected render(): void;
    protected shouldUseCustomRender(): boolean;
    protected customRender(): void;
    protected getCustomStyles(): string;
    protected onAfterRender(): void;
    protected navigatePrev(): void;
    protected navigateNext(): void;
    protected getNavigationButtons(): string;
    protected getNavigationStyles(): string;
    protected addNavigationListeners(): void;
    protected updateNavigationVisibility(): void;
}

export declare class CcViewerGaussian extends CcViewerBase {
    private splatUrl;
    private debugMode;
    private cameraPosition;
    private _cameraTarget;
    private scene?;
    private camera?;
    private renderer?;
    private controls?;
    private animationId?;
    private canvas?;
    private swiper?;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    protected doOpen(url: string): Promise<void>;
    protected doClose(): void;
    protected getViewerContent(): string;
    protected shouldUseCustomRender(): boolean;
    protected customRender(): void;
    private cleanup;
    private getCameraDebugInfo;
    private getTargetDebugInfo;
    private updateDebugInfo;
    private initializeViewer;
    private handleResize;
}

export declare class CcViewerImage extends CcViewerBase {
    private viewer?;
    private container?;
    private imageUrl;
    protected doOpen(url: string): void;
    protected doClose(): void;
    protected getViewerContent(): string;
    protected getCustomStyles(): string;
    protected onAfterRender(): void;
}

export declare class CcViewerPanorama extends CcViewerBase {
    private imgUrl;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    protected doOpen(imgUrl: string): void;
    protected doClose(): void;
    protected getViewerContent(): string;
    protected getCustomStyles(): string;
    protected onAfterRender(): void;
}

export declare class CcViewerVideo extends CcViewerBase {
    private videoUrl;
    private fitToContainer;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    protected doOpen(url: string): void;
    protected doClose(): void;
    protected getViewerContent(): string;
    protected getCustomStyles(): string;
    protected onAfterRender(): void;
    private handleVideoError;
}

export declare class CcViewerYoutube extends CcViewerBase {
    private videoUrl;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    protected doOpen(videoUrl: string): void;
    private extractYouTubeId;
    protected doClose(): void;
    protected getViewerContent(): string;
    protected getCustomStyles(): string;
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

export { }
