/** Shared interaction tuning values. Extend this object for later viewer work. */
export const FEEL = {
  dragThresholdPx: 8,
  swipeCommitRatio: 0.2,
  swipeVelocityPxPerMs: 0.35,
  slideTransitionMs: 250,
  dampingFactor: 0.9,
  rotateSpeed: 1,
  panSpeed: 1,
  wheelZoomStep: 0.0015,
  doubleTapMs: 300,
  barHideDelayMs: 3000
} as const;

export const CONTROLS_HINT = {
  ja: "ドラッグ：回転／移動　ホイール・ピンチ：拡大縮小　右ドラッグ・2 本指：平行移動　ダブルクリック：元に戻す",
  en: "Drag: rotate / move  Wheel / pinch: zoom  Right-drag / two fingers: pan  Double-click: reset"
} as const;
