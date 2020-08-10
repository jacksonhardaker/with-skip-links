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
  register: Function
  clear: Function
}
