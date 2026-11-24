/**
 * スライダーの番号の計算。
 *
 * - `normalizeIndex`: 番号を範囲内へ収める。loop なら回り込み、そうでなければ端で止める。
 * - `stepIndex`: 1 枚分前後した番号を返す（規則は normalizeIndex と同じ）。
 * - `slideOffsets`: 各スライドの位置（幅単位）。current を 0 とし、loop 時は
 *   current の前後に回り込ませる（スライドを複製せず、位置の計算だけで回す）。
 */

/**
 * 番号を 0..count-1 の範囲へ収める。
 * loop=true なら前後で回り込み、loop=false は端で止める。スライドが無いときは 0。
 */
export function normalizeIndex(i: number, count: number, loop: boolean): number {
  if (count <= 0) return 0
  if (!loop) return Math.min(Math.max(i, 0), count - 1)
  return ((i % count) + count) % count
}

/** 1 枚分前後した番号を返す。端の扱いは normalizeIndex と同じ。 */
export function stepIndex(i: number, delta: -1 | 1, count: number, loop: boolean): number {
  return normalizeIndex(i + delta, count, loop)
}

/**
 * 各スライドの位置（幅単位）を返す。戻り値の添字がスライド番号。
 * current のスライドが 0、loop 時は current の前後に回り込ませる。
 * 位置は translateX(offset * 100%) のように、そのまま変換量に使える。
 */
export function slideOffsets(current: number, count: number, loop: boolean): number[] {
  if (count <= 0) return []
  const offsets: number[] = []
  for (let index = 0; index < count; index++) {
    let offset = index - current
    if (loop && count > 1) {
      offset = ((offset % count) + count) % count
      if (offset > count / 2) offset -= count
    }
    offsets.push(offset)
  }
  return offsets
}
