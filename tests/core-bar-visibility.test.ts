import { describe, expect, test, vi } from "vitest";
import { BarVisibility } from "../src/core/bar-visibility";

describe("BarVisibility", () => {
  test("shown → visible, hidden after 3000 ms", () => {
    vi.useFakeTimers();
    const changes: boolean[] = [];
    const visibility = new BarVisibility((visible) => changes.push(visible));
    visibility.shown();
    expect(changes).toEqual([true]);
    vi.advanceTimersByTime(2999);
    expect(changes).toEqual([true]);
    vi.advanceTimersByTime(1);
    expect(changes).toEqual([true, false]);
    visibility.dispose();
  });

  test("interacted hides immediately", () => {
    vi.useFakeTimers();
    const changes: boolean[] = [];
    const visibility = new BarVisibility((visible) => changes.push(visible));
    visibility.shown();
    visibility.interacted();
    expect(changes).toEqual([true, false]);
    vi.advanceTimersByTime(3000);
    expect(changes).toEqual([true, false]);
    visibility.dispose();
  });

  test("poked shows and restarts timer", () => {
    vi.useFakeTimers();
    const changes: boolean[] = [];
    const visibility = new BarVisibility((visible) => changes.push(visible));
    visibility.shown();
    vi.advanceTimersByTime(2000);
    visibility.poked();
    vi.advanceTimersByTime(2000);
    expect(changes).toEqual([true]);
    vi.advanceTimersByTime(1000);
    expect(changes).toEqual([true, false]);
    visibility.dispose();
  });
});
