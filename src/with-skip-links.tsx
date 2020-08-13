import * as React from 'react'
import { SkipLink, SkipLinksReducerAction, WithSkipLinksProps, SkipLinkActions, SkipLinksState, RefFunction, RegisterAction, ClearAction } from './types'
import { sortLinks } from './utils/sort'

const SkipLinksDispatchContext = React.createContext<Function | undefined>(undefined)
const SkipLinksStateContext = React.createContext<SkipLinksState | undefined>(undefined)

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

export function WithSkipLinks({ children, defaultSkipLinks }: WithSkipLinksProps): React.ReactNode | React.ReactNodeArray {
  const [state, dispatch] = React.useReducer(reducer, defaultSkipLinks || [])

  return (
    <SkipLinksStateContext.Provider value={state}>
      <SkipLinksDispatchContext.Provider value={dispatch}>
        {children}
      </SkipLinksDispatchContext.Provider>
    </SkipLinksStateContext.Provider>
  )
}

export function useSkipLinkActions(): SkipLinkActions {
  const dispatch = React.useContext(SkipLinksDispatchContext)

  if (!dispatch) {
    throw new Error('Must be a child of "WithSkipLinks" to use "useSkipLinkActions".')
  }

  const register: RegisterAction = (skipLink): RefFunction | undefined => {
    return (ref) => {
      if (ref) {
        // Assign ID once ref becomes available
        dispatch({
          type: 'REGISTER',
          payload: {
            ...skipLink,
            ref,
          },
        })
        ref.id = skipLink.to
      }
    }
  }

  const clear: ClearAction = () => {
    dispatch({ type: 'CLEAR' })
  }

  return { register, clear }
}

export function useSkipLinksContent(): SkipLinksState | undefined {
  return React.useContext(SkipLinksStateContext)
}
