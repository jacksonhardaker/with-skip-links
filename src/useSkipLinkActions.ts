import * as React from 'react'
import { RegisterAction, RefFunction, ClearAction, ActionType } from './types'
import { SkipLinksDispatchContext } from './context'

/**
 * Can only be used from a child component of [[WithSkipLinks]].
 * 
 * ```javascript
 * const { register, clear } = useSkipLinkActions();
 * ```
 */
export function useSkipLinkActions() {
  const dispatch = React.useContext(SkipLinksDispatchContext)

  if (!dispatch) {
    throw new Error('Must be a child of "WithSkipLinks" to use "useSkipLinkActions".')
  }

  const register: RegisterAction = (skipLink): RefFunction => {
    return (ref) => {
      if (ref) {
        // Assign ID once ref becomes available
        dispatch({
          type: ActionType.register,
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
    dispatch({ type: ActionType.clear })
  }

  return { register, clear }
}
