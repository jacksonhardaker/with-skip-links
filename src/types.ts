import React from 'react'

export enum ActionType {
  register = 'REGISTER',
  clear = 'CLEAR',
}

/**
 * @param label Screenreader friendly description of the section of the document the selected link with skip to.
 * @param to The HTMLElement id to skip to.
 * @param ref Optional ref to the "skip to" HTMLElement. Required for accurate ordering of links.
 */
export type SkipLink = {
  label: string
  to: string
  ref?: HTMLElement
}

export type SkipLinksState = SkipLink[]

/**
 * Action to be passed to the [[reducer]], via a dispatch function.
 * Manual dispatch calls are unecessary. Use [[RegisterAction]] or [[ClearAction]] from [[useSkipLinkActions]] instead.
 * 
 * ```javascript
 * const { register, clear } = useSkipLinkActions();
 * ```
 */
export type Action = {
  type: ActionType | string
  payload?: SkipLink
}

/**
 * @param children Your application.
 * @param defaultSkipLinks The optional initial state. Necessary for SSR.
 */
export type WithSkipLinksProps = {
  children: React.ReactNode
  defaultSkipLinks?: SkipLinksState
}

/**
 * To be used as the value for an element ref.
 * ```tsx
 * <div ref={callback: RefFunction} />
 * ```
 */
export type RefFunction = (ref: HTMLElement) => void

/**
 * Registers a [[SkipLink]]. Once the element is available in the DOM.
 * @returns A callback to be used as the ref prop of an element. Once the element is available, the [[SkipLink]]
 * will be registered, and the id applied to the given HTMLElement.
 */
export type RegisterAction = (skipLink: SkipLink) => RefFunction

/**
 * Resets the [[SkipLink]][] state stored in [[WithSkipLinks]]
 */
export type ClearAction = () => void
