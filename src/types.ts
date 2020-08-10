import React from 'react'

export type SkipLink = {
  label: string
  to: string
  position: number
}

export type SkipLinksReducerAction = {
  type: string
  payload: SkipLink
}

export type SkipLinksState = SkipLink[]

export type WithSkipLinksProps = {
  children: React.ReactNode | React.ReactNodeArray
  defaultSkipLinks: SkipLinksState
}

export type SkipLinkActions = {
  register: RegisterAction
  clear: ClearAction
}

export type RefFunction = (ref: HTMLElement) => void

export type RegisterAction = (skipLink: SkipLink) => RefFunction | undefined

export type ClearAction = () => void
