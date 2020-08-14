import * as React from 'react'
import { SkipLinksState } from './types'

export const SkipLinksDispatchContext = React.createContext<Function | undefined>(undefined)
export const SkipLinksStateContext = React.createContext<SkipLinksState | undefined>(undefined)
