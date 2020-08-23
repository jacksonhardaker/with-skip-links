import { SkipLinksState } from "../types"
import { evalPosition } from "./compare-dom-position"

export function sortLinks(links: SkipLinksState): SkipLinksState {
  const clone = [...links].sort((a, b) => {
    // ref undefined during SSR
    if (a?.ref && b?.ref) {
      return evalPosition(
        a.ref?.compareDocumentPosition?.(b.ref) || 0
      )
    }

    return 0
  })
  return clone
}
