import * as React from 'react'
import { SkipLink, SkipLinksReducerAction, WithSkipLinksProps, SkipLinksState } from './types'
import { sortLinks } from './utils/sort'
import { SkipLinksStateContext, SkipLinksDispatchContext } from './context'

function reducer(state: SkipLink[], { type, payload }: SkipLinksReducerAction): SkipLinksState {
  switch (type) {
    case 'REGISTER':
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
    case 'CLEAR':
      return []
    default:
      throw new Error(`Unknown action: ${type}`)
  }
}

export function WithSkipLinks({ children, defaultSkipLinks }: WithSkipLinksProps): React.ReactNode {
  const [state, dispatch] = React.useReducer(reducer, defaultSkipLinks || [])

  return (
    <SkipLinksStateContext.Provider value={state}>
      <SkipLinksDispatchContext.Provider value={dispatch}>
        {children}
      </SkipLinksDispatchContext.Provider>
    </SkipLinksStateContext.Provider>
  )
}
