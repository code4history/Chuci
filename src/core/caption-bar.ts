/**
 * キャプションと点の列の帯（スライダー S1・ビューア V2 で共用）。
 *
 * - `captionBarModel`: 帯の要否と表示するものを決める（設計書 5.7 の表）。
 * - `renderCaptionBar`: host の中身を作り直して帯を組み立てる。外部由来のキャプションは
 *   textContent だけを通す。mode は CSS のクラスだけを変える。
 * - `captionBarStyles`: 帯の CSS（同じクラス名を前提に、使う側が style へ流し込む）。
 */

export type Indicator = 'dots' | 'counter' | 'none'

export interface CaptionBarModel {
  showBar: boolean
  caption: string
  indicator: Indicator
}

/** 点の列を数字（n / N）に切り替える件数の境目。これを超えたら数字にする */
export const COUNTER_THRESHOLD = 8

/**
 * 帯の規則（設計書 5.7）：
 * - 2 件以上なら帯を出す（キャプションが空でも点の列のために出す）
 * - 1 件だけでキャプションもなければ、帯は出さない
 * - 1 件でキャプションがあれば、キャプションだけの帯を出す
 * - has-thumb のときは点の列を出さない（サムネイル列が代わりを務める）
 * - 8 件を超えたら点の列を「2 / 12」の数字に切り替える
 */
export function captionBarModel(count: number, caption: string, hasThumb: boolean): CaptionBarModel {
  let indicator: Indicator = 'none'
  if (!hasThumb && count > COUNTER_THRESHOLD) {
    indicator = 'counter'
  } else if (!hasThumb && count > 1) {
    indicator = 'dots'
  }
  return {
    showBar: count > 1 || caption !== '',
    caption,
    indicator
  }
}

/**
 * 帯を host に組み立てる。呼ぶたびに host の中身を作り直す。
 *
 * 構造：`.cc-bar` > `.cc-bar-caption` ＋ `.cc-bar-indicator`
 * mode は `cc-bar--slider` / `cc-bar--viewer` のクラスだけを変える。
 * showBar が false なら何も置かない。
 */
export function renderCaptionBar(
  host: HTMLElement,
  model: CaptionBarModel,
  index: number,
  count: number,
  onJump: (i: number) => void,
  mode: 'slider' | 'viewer'
): void {
  host.replaceChildren()
  if (!model.showBar) return

  const bar = document.createElement('div')
  bar.className = mode === 'viewer' ? 'cc-bar cc-bar--viewer' : 'cc-bar cc-bar--slider'

  const captionEl = document.createElement('div')
  captionEl.className = 'cc-bar-caption'
  captionEl.textContent = model.caption

  const indicatorEl = document.createElement('div')
  indicatorEl.className = 'cc-bar-indicator'

  if (model.indicator === 'counter') {
    const counter = document.createElement('span')
    counter.className = 'cc-bar-counter'
    counter.textContent = `${index + 1} / ${count}`
    indicatorEl.appendChild(counter)
  } else if (model.indicator === 'dots') {
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button')
      dot.type = 'button'
      dot.className = 'cc-bar-dot'
      dot.setAttribute('aria-label', `Slide ${i + 1}`)
      if (i === index) dot.setAttribute('aria-current', 'true')
      dot.addEventListener('click', () => onJump(i))
      indicatorEl.appendChild(dot)
    }
  }

  bar.append(captionEl, indicatorEl)
  host.appendChild(bar)
}

/** 帯の CSS。`.cc-bar` 以下のクラス名は renderCaptionBar が作る構造に合わせる */
export const captionBarStyles = `
.cc-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}
.cc-bar-caption {
  flex: 1 1 auto;
  min-width: 0;
}
.cc-bar--slider .cc-bar-caption {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cc-bar--viewer .cc-bar-caption {
  white-space: normal;
  overflow-wrap: anywhere;
}
.cc-bar-indicator {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 6px;
}
.cc-bar-counter {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.cc-bar-dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.35;
  cursor: pointer;
}
.cc-bar-dot[aria-current='true'] {
  opacity: 1;
}
`
