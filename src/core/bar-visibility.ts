import { FEEL } from "./feel";

export class BarVisibility {
  private visible = false;
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor(
    private readonly onChange: (visible: boolean) => void,
    private readonly setTimer: typeof setTimeout = setTimeout,
    private readonly clearTimer: typeof clearTimeout = clearTimeout
  ) {}

  shown(): void {
    this.showAndSchedule();
  }

  interacted(): void {
    this.clearScheduledHide();
    this.setVisible(false);
  }

  poked(): void {
    this.showAndSchedule();
  }

  dispose(): void {
    this.clearScheduledHide();
  }

  private showAndSchedule(): void {
    this.setVisible(true);
    this.clearScheduledHide();
    this.timer = this.setTimer(() => {
      this.timer = undefined;
      this.setVisible(false);
    }, FEEL.barHideDelayMs);
  }

  private clearScheduledHide(): void {
    if (this.timer === undefined) return;
    this.clearTimer(this.timer);
    this.timer = undefined;
  }

  private setVisible(visible: boolean): void {
    if (this.visible === visible) return;
    this.visible = visible;
    this.onChange(visible);
  }
}
