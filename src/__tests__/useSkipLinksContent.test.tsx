import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import { useSkipLinksContent } from '../useSkipLinksContent'
import { SkipLinksState, SkipLink } from '../types'
import { WithSkipLinks } from '../WithSkipLinks'

let state: SkipLinksState | null = null
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn())

beforeEach(() => {
  state = null
})

afterEach(() => {
  cleanup()
  consoleErrorSpy.mockReset()
})

type Props = {
  children?: React.ReactNode
}

const TestWrapper = (props: Props) => {
  state = useSkipLinksContent()
  return <>{props.children || null}</>
}

describe('useSkipLinksContent hook', () => {

  test('should throw an error when not wrapped with WithSkipLinks', () => {
    expect(() => render(<TestWrapper />)).toThrow()
    expect(state).toEqual(null)
    expect(global.console.error).toHaveBeenCalled()
  })

  test('should return state of [] when wrapped with WithSkipLinks and NOT given a default state', () => {
    render(<WithSkipLinks><TestWrapper /></WithSkipLinks>)
    expect(state).toEqual([])
  })

  test('should return default state when wrapped with WithSkipLinks', () => {
    const expectedState: SkipLink[] = [
      { label: 'here', to: '#there' },
      { label: 'and', to: '#everywhere' },
    ]
    render(<WithSkipLinks defaultSkipLinks={expectedState}><TestWrapper /></WithSkipLinks>)
    expect(state).toEqual(expectedState)
    expect(state?.[0].label).toEqual('here')
    expect(state?.[1].to).toEqual('#everywhere')
  })
})
