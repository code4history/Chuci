/** Shared interaction tuning values. Extend this object for later viewer work. */
export const FEEL = {
  dragThresholdPx: 8,
  swipeCommitRatio: 0.2,
  swipeVelocityPxPerMs: 0.35,
  slideTransitionMs: 250,
  slideAutoplayMs: 5000,
  dampingFactor: 0.9,
  dampingReferenceHz: 60,
  rotateSpeed: 1,
  panSpeed: 1,
  wheelZoomStep: 0.0015,
  imageMinZoom: 0.25,
  imageMaxZoom: 8,
  panoramaMaxPitchDeg: 85,
  panoramaMinFovDeg: 30,
  panoramaMaxFovDeg: 100,
  doubleTapMs: 300,
  doubleTapSlopPx: 24,
  barHideDelayMs: 3000
} as const;

export const CONTROLS_HINT = {
  ja: "1 本指／左ドラッグ：回転／移動　2 本指／右ドラッグ：平行移動　ホイール／ピンチ：拡大縮小　ダブルクリック／ダブルタップ：初期表示に戻す",
  en: "One finger / left drag: rotate / move  Two fingers / right drag: pan  Wheel / pinch: zoom  Double-click / double-tap: reset view"
} as const;
