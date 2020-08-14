import * as React from 'react'
import { SkipLinksState } from './types'
import { SkipLinksStateContext } from './context'

export function useSkipLinksContent(): SkipLinksState {
  const state = React.useContext(SkipLinksStateContext)
  if (!state) {
    throw new Error('Must be a child of "WithSkipLinks" to use "useSkipLinksContent".')
  }
  return state
}
