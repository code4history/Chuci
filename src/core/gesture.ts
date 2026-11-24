import { FEEL } from "./feel";

export type GestureEvent =
  | { kind: "rotate" | "pan"; dx: number; dy: number }
  | { kind: "zoom"; factor: number; cx: number; cy: number }
  | { kind: "reset" }
  | { kind: "tap" }
  | { kind: "start" };

type PointerPosition = { x: number; y: number; pointerType: string; button: number };
type GestureListener = (event: GestureEvent) => void;

export class GestureInterpreter {
  private readonly listeners = new Set<GestureListener>();
  private readonly pointers = new Map<number, PointerPosition>();
  private primaryId: number | undefined;
  private primaryStart: PointerPosition | undefined;
  private primaryLast: PointerPosition | undefined;
  private primaryKind: "rotate" | "pan" = "rotate";
  private primaryStarted = false;
  private multiPointer = false;
  private pinchStartDistance = 0;
  private pinchStartCenter: PointerPosition | undefined;
  private pinchLastDistance = 0;
  private pinchLastCenter: PointerPosition | undefined;
  private pinchStarted = false;
  private lastTap = Number.NEGATIVE_INFINITY;
  private lastTapPosition: PointerPosition | undefined;
  private previousTouchAction: string | undefined;
  private wheelTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(
    private readonly target: HTMLElement,
    onGesture: GestureListener,
    private readonly options: { observeOnly?: boolean } = {}
  ) {
    this.listeners.add(onGesture);
    if (!options.observeOnly) {
      // 余白から始めたタッチでもブラウザのスクロールに奪われないよう、受け手全体で既定のタッチ操作を止める
      this.previousTouchAction = target.style.touchAction;
      target.style.touchAction = "none";
    }
    target.addEventListener("pointerdown", this.onPointerDown);
    target.addEventListener("pointermove", this.onPointerMove);
    target.addEventListener("pointerup", this.onPointerUp);
    target.addEventListener("pointercancel", this.onPointerCancel);
    target.addEventListener("lostpointercapture", this.onLostPointerCapture);
    // The viewer shell observes taps without interfering with renderer input.
    if (!options.observeOnly) {
      target.addEventListener("wheel", this.onWheel, { passive: false });
      target.addEventListener("contextmenu", this.onContextMenu);
    }
  }

  get viewportHeight(): number {
    return this.target.getBoundingClientRect().height;
  }

  subscribe(listener: GestureListener): () => void {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  private onGesture(event: GestureEvent): void {
    for (const listener of this.listeners) listener(event);
  }

  dispose(): void {
    if (this.previousTouchAction !== undefined) {
      this.target.style.touchAction = this.previousTouchAction;
      this.previousTouchAction = undefined;
    }
    this.target.removeEventListener("pointerdown", this.onPointerDown);
    this.target.removeEventListener("pointermove", this.onPointerMove);
    this.target.removeEventListener("pointerup", this.onPointerUp);
    this.target.removeEventListener("pointercancel", this.onPointerCancel);
    this.target.removeEventListener("lostpointercapture", this.onLostPointerCapture);
    this.target.removeEventListener("wheel", this.onWheel);
    this.target.removeEventListener("contextmenu", this.onContextMenu);
    if (this.wheelTimer !== undefined) clearTimeout(this.wheelTimer);
    this.wheelTimer = undefined;
    this.pointers.clear();
    this.listeners.clear();
  }

  private readonly onPointerDown = (event: PointerEvent): void => {
    if (event.pointerType === "mouse" && event.button !== 0 && event.button !== 2) return;
    const position = this.position(event);
    this.pointers.set(event.pointerId, {
      ...position,
      pointerType: event.pointerType,
      button: event.button
    });
    if (!this.options.observeOnly && typeof this.target.setPointerCapture === "function")
      this.target.setPointerCapture(event.pointerId);
    if (this.pointers.size === 1) {
      this.primaryId = event.pointerId;
      this.primaryStart = position;
      this.primaryLast = position;
      this.primaryKind = event.button === 2 ? "pan" : "rotate";
      this.primaryStarted = false;
      this.multiPointer = false;
      return;
    }
    this.multiPointer = true;
    if (this.pointers.size === 2) {
      const [first, second] = [...this.pointers.values()];
      this.pinchLastCenter = this.center(first, second);
      this.pinchLastDistance = this.distance(first, second);
      this.pinchStartCenter = this.pinchLastCenter;
      this.pinchStartDistance = this.pinchLastDistance;
      this.pinchStarted = false;
    }
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (!this.pointers.has(event.pointerId)) return;
    const position = this.position(event);
    const previous = this.pointers.get(event.pointerId)!;
    this.pointers.set(event.pointerId, { ...previous, ...position });

    if (this.pointers.size >= 2) {
      this.moveMultiplePointers();
      return;
    }
    if (event.pointerId !== this.primaryId || !this.primaryStart || !this.primaryLast) return;
    const totalDx = position.x - this.primaryStart.x;
    const totalDy = position.y - this.primaryStart.y;
    if (!this.primaryStarted && Math.hypot(totalDx, totalDy) < FEEL.dragThresholdPx) {
      this.primaryLast = position;
      return;
    }
    if (!this.primaryStarted) {
      this.primaryStarted = true;
      this.onGesture({ kind: "start" });
      this.onGesture({ kind: this.primaryKind, dx: totalDx, dy: totalDy });
    } else {
      this.onGesture({
        kind: this.primaryKind,
        dx: position.x - this.primaryLast.x,
        dy: position.y - this.primaryLast.y
      });
    }
    this.primaryLast = position;
  };

  private readonly onPointerUp = (event: PointerEvent): void => {
    this.finishPointer(event, false);
  };

  private readonly onPointerCancel = (event: PointerEvent): void => {
    this.finishPointer(event, true);
  };

  private readonly onLostPointerCapture = (event: PointerEvent): void => {
    this.finishPointer(event, true);
  };

  private finishPointer(event: PointerEvent, canceled: boolean): void {
    const pointer = this.pointers.get(event.pointerId);
    if (!pointer) return;
    this.pointers.delete(event.pointerId);
    if (this.pointers.size === 0) {
      if (!canceled && !this.multiPointer && !this.primaryStarted && pointer.button !== 2) {
        this.handleTap(pointer);
      }
      this.resetPointerState();
    } else if (this.pointers.size === 1) {
      const [remainingId, remaining] = [...this.pointers.entries()][0];
      this.primaryId = remainingId;
      this.primaryStart = remaining;
      this.primaryLast = remaining;
      this.primaryStarted = this.primaryStarted || this.pinchStarted;
      this.multiPointer = true;
      this.pinchStarted = false;
    }
  }

  private readonly onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    if (this.wheelTimer === undefined) this.onGesture({ kind: "start" });
    else clearTimeout(this.wheelTimer);
    this.wheelTimer = setTimeout(() => {
      this.wheelTimer = undefined;
    }, FEEL.doubleTapMs);
    const rect = this.target.getBoundingClientRect();
    this.onGesture({
      kind: "zoom",
      factor: Math.exp(-event.deltaY * FEEL.wheelZoomStep),
      cx: event.clientX - rect.left,
      cy: event.clientY - rect.top
    });
  };

  private readonly onContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
  };

  private moveMultiplePointers(): void {
    const points = [...this.pointers.values()].slice(0, 2);
    const [first, second] = points;
    const center = this.center(first, second);
    const distance = this.distance(first, second);
    const thresholdCenter = this.pinchStarted ? this.pinchLastCenter : this.pinchStartCenter;
    const thresholdDistance = this.pinchStarted ? this.pinchLastDistance : this.pinchStartDistance;
    const centerDelta = thresholdCenter
      ? { dx: center.x - thresholdCenter.x, dy: center.y - thresholdCenter.y }
      : { dx: 0, dy: 0 };
    const distanceDelta = Math.abs(distance - thresholdDistance);
    if (!this.pinchStarted && Math.hypot(centerDelta.dx, centerDelta.dy) < FEEL.dragThresholdPx && distanceDelta < FEEL.dragThresholdPx) {
      return;
    }
    if (!this.pinchStarted) {
      this.pinchStarted = true;
      this.onGesture({ kind: "start" });
    }
    const previousDistance = this.pinchStarted ? this.pinchLastDistance : this.pinchStartDistance;
    // 先に中心の移動を pan で送り、その後で新しい中心を基準に zoom を送る。
    // こうすると、指の中心にあった点が拡大縮小の後も指の中心に留まる。
    if (centerDelta.dx !== 0 || centerDelta.dy !== 0)
      this.onGesture({ kind: "pan", dx: centerDelta.dx, dy: centerDelta.dy });
    if (previousDistance > 0 && distance !== previousDistance) {
      this.onGesture({
        kind: "zoom",
        factor: distance / previousDistance,
        cx: center.x,
        cy: center.y
      });
    }
    this.pinchLastCenter = center;
    this.pinchLastDistance = distance;
  }

  private handleTap(position: PointerPosition): void {
    const now = Date.now();
    const previous = this.lastTapPosition;
    const isDoubleTap =
      previous !== undefined &&
      now - this.lastTap <= FEEL.doubleTapMs &&
      previous.pointerType === position.pointerType &&
      Math.hypot(position.x - previous.x, position.y - previous.y) <= FEEL.doubleTapSlopPx;
    if (isDoubleTap) {
      this.lastTap = Number.NEGATIVE_INFINITY;
      this.lastTapPosition = undefined;
      this.onGesture({ kind: "reset" });
    } else {
      this.lastTap = now;
      this.lastTapPosition = position;
      this.onGesture({ kind: "tap" });
    }
  }

  private resetPointerState(): void {
    this.primaryId = undefined;
    this.primaryStart = undefined;
    this.primaryLast = undefined;
    this.primaryStarted = false;
    this.multiPointer = false;
    this.pinchLastCenter = undefined;
    this.pinchLastDistance = 0;
    this.pinchStartCenter = undefined;
    this.pinchStartDistance = 0;
    this.pinchStarted = false;
  }

  private position(event: PointerEvent): PointerPosition {
    const rect = this.target.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top, pointerType: event.pointerType, button: event.button };
  }

  private center(first: PointerPosition, second: PointerPosition): PointerPosition {
    return { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2, pointerType: "touch", button: 0 };
  }

  private distance(first: PointerPosition, second: PointerPosition): number {
    return Math.hypot(second.x - first.x, second.y - first.y);
  }
}
