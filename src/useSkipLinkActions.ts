import * as React from 'react'
import { SkipLinkActions, RegisterAction, RefFunction, ClearAction } from './types'
import { SkipLinksDispatchContext } from './context'

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
