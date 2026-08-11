export declare class CcSwiper extends ChuciElement {
    private slider?;
    private divContainer?;
    private divSlides?;
    private divGallery?;
    private divPagination?;
    private divPrevious?;
    private divNext?;
    private isDragging;
    static get observedAttributes(): string[];
    get hasThumb(): boolean;
    get autoplay(): boolean;
    get slides(): CcSwiperSlide[];
    openViewer(imageUrl: string, imageType: string, slideIndex?: number): Promise<void>;
    protected firstUpdated(): void;
    /**
     * m1-t9: スライド要素を DOM API で組み立てる（設計 §5 D1 の S1/S2/S7）。
     *
     * 外部由来値（thumbnail-url / image-url / image-type / caption）は
     * すべて setAttribute と textContent で入れる。文字列補間を経由させない。
     */
    private buildSlideElements;
    /**
     * m1-t9: ギャラリーのサムネイルを DOM API で組み立てる（設計 §5 D1 の S3）。
     *
     * background-image は **CSS コンテキスト**であり HTML エスケープでは守れない。
     * `escapeCssUrl` で `"` と `\` のみをエスケープして url("…") へ入れる。
     * `CSS.escape` は使わない — CSS 識別子用であり URL に適用すると `/` `:` `.` まで
     * エスケープされて URL が壊れる（設計 §5 D1 の S3 セル）。
     */
    private buildGalleryElements;
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
    /**
     * m1-t9: 外部由来値（POI の URL 等）を描画後の DOM へ setAttribute で入れるフック。
     *
     * getViewerContent() が返すテンプレートには **外部由来値を含めない**。
     * 文字列補間すると属性ブレイクアウトが成立するためである
     * （m1 包括セキュリティレビュー SRH-1・設計書 §5 D1）。
     */
    protected applyExternalValues(): void;
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
    /**
     * m1-t9 D5（SRH-2）: aframe CDN の Subresource Integrity。
     *
     * 実際に取得して算出した（2026-08-01）:
     *   curl -sSL https://aframe.io/releases/1.4.0/aframe.min.js  → 1,325,299 bytes
     *   openssl dgst -sha384 -binary | openssl base64 -A
     *
     * SRI が無いと CDN 侵害時に viewer 文脈で任意コードが走る。
     * **URL の版を上げるときは必ずこのハッシュも取り直すこと**（不一致だと読み込まれない）。
     */
    private static readonly AFRAME_SRI;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    protected doOpen(imgUrl: string): void;
    protected doClose(): void;
    protected getViewerContent(): string;
    protected getCustomStyles(): string;
    /**
     * m1-t9 S4: srcdoc は **外部由来値を一切含まない固定文字列** である（設計 §5 D1）。
     *
     * 画像 URL は postMessage で iframe へ渡し、iframe 内で setAttribute する。
     * `contentDocument` を使わないのは、D4 で `sandbox="allow-scripts"` を採ると
     * iframe が opaque origin になり親からのアクセスが遮断されるためである。
     * postMessage なら sandbox の有無にかかわらず成立する。
     *
     * 競合を避けるため、iframe 側から `cc-panorama-ready` を受け取ってから URL を送る。
     */
    private static readonly IFRAME_HTML;
    private onIframeReady?;
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
    protected applyExternalValues(): void;
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
    protected applyExternalValues(): void;
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

/**
 * m1-t9: CSS の `url("…")` へ値を入れるためのエスケープ（設計 §5 D1 の S3）。
 *
 * 二重引用符で囲む前提で、`"` と `\` のみをバックスラッシュでエスケープする。
 * URL に現れ得る `/` `:` `.` `?` `&` `%` は**触らない** — 触ると正系の URL が壊れる。
 * `CSS.escape` は CSS 識別子用のため、この用途では使ってはならない。
 */
export declare function escapeCssUrl(value: string): string;

export { }
