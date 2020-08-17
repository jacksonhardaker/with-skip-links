import * as React from 'react'
import { SkipLink, Action, WithSkipLinksProps, SkipLinksState, ActionType } from './types'
import { sortLinks } from './utils/sort'
import { SkipLinksStateContext, SkipLinksDispatchContext } from './context'

export function reducer(state: SkipLink[], { type, payload }: Action): SkipLinksState {
  switch (type) {
    case ActionType.register:
      if (!payload) {
        return state
      }

      const exists = state.find(
        (skipLink) => skipLink.to === payload.to
      )
      return exists
        ? sortLinks(
          state.map((skipLink) =>
            skipLink.to === payload.to
              ? Object.assign(skipLink, payload)
              : skipLink
          )
        )
        : sortLinks([
          ...state,
          {
            ...payload, // Order by position in the document
          },
        ])
    case ActionType.clear:
      return []
    default:
      throw new Error(`Unknown action: ${type}`)
  }
}

/**
 * Context wrapper to maintain the list of [[SkipLink]] items in state on any given page, in the order that they appear within the DOM.
 * To support SSR, a default [[SkipLink]][] can be provided. When relying on this, the id attribute must be manually
 * applied to the target elements.
 * 
 * ```jsx
 * <WithSkipLinks defaultSkipLinks={...}>
 *    // your app here
 * </WithSkipLinks>
 * ```
 */
export function WithSkipLinks({ children, defaultSkipLinks }: WithSkipLinksProps) {
  const [state, dispatch] = React.useReducer(reducer, defaultSkipLinks || [])

  return (
    <SkipLinksStateContext.Provider value={state}>
      <SkipLinksDispatchContext.Provider value={dispatch}>
        {children}
      </SkipLinksDispatchContext.Provider>
    </SkipLinksStateContext.Provider>
  )
}
