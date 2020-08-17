import * as React from 'react'
import { render, cleanup, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { WithSkipLinks } from '../WithSkipLinks'
import { WithSkipLinksProps, SkipLinksState, RegisterAction, ClearAction } from '../types'
import { useSkipLinksContent } from '../useSkipLinksContent'
import { useSkipLinkActions } from '../useSkipLinkActions'

let state: SkipLinksState | null = null
let actions: { register: RegisterAction, clear: ClearAction } | null
const mockDefaultState = [
  { label: 'Navigate Here', to: 'here' },
  { label: 'Navigate There', to: 'there' },
  { label: 'Navigate Anywhere', to: 'anywhere' },
]

beforeEach(() => {
  state = null
  actions = null
})

afterEach(cleanup)

type Props = {
  children?: React.ReactNode
}

const TestState = (props: Props) => {
  state = useSkipLinksContent()
  return <>{props.children || null}</>
}

const TestActions = (props: Props) => {
  actions = useSkipLinkActions()
  return <>{props.children || null}</>
}

const Test = ({ children, defaultSkipLinks }: WithSkipLinksProps) => <WithSkipLinks {...{ defaultSkipLinks }}>{children}</WithSkipLinks>

describe('WithSkipLinks', () => {

  test('renders the passed children', () => {
    const { getByText } = render((
      <Test>
        <div>This is the dawning of the age of Aquarius</div>
      </Test>
    ))

    expect(getByText(/This is the dawning of the age of Aquarius/)).toBeInTheDocument()
  })

  test('initial state is [] when defaultSkipLinks is not set', () => {
    render((
      <Test>
        <div>This is the dawning of the age of Aquarius</div>
        <TestState />
      </Test>
    ))

    expect(state).toStrictEqual([])
  })

  test('sets the default state when given', () => {
    render((
      <Test defaultSkipLinks={mockDefaultState}>
        <div>This is the dawning of the age of Aquarius</div>
        <TestState />
      </Test>
    ))

    expect(state).toStrictEqual(mockDefaultState)
    expect(state).not.toStrictEqual([])
  })

  test('clears the state as expected', () => {
    render((
      <Test defaultSkipLinks={mockDefaultState}>
        <TestState />
        <TestActions />
      </Test>
    ))

    const initialState = state ? [...state] : state

    act(() => {
      actions?.clear()
    })

    expect(initialState).toStrictEqual(mockDefaultState)
    expect(state).toStrictEqual([])
  })

  describe('registering skip links', () => {
    const DOM = () => {
      const { register } = useSkipLinkActions()
      return (
        <>
          <header ref={register({ label: 'Nav to Header', to: 'skip-header' })}>I'm a header</header>
          <main ref={register({ label: 'Nav to Main', to: 'skip-main' })}>I'm the main content</main>
          <footer ref={register({ label: 'Nav to Footer', to: 'skip-footer' })}>I'm a footer</footer>
        </>
      )
    }

    test('should register the skip links as expected', () => {
      const { getByText, container } = render((
        <Test>
          <DOM />
          <TestState />
        </Test>
      ))

      expect(getByText(/I'm a header/)).toBeInTheDocument()
      expect(getByText(/I'm the main content/)).toBeInTheDocument()
      expect(getByText(/I'm a footer/)).toBeInTheDocument()

      expect(state).not.toBeNull()
      expect(state?.[0].label).toBe('Nav to Header')
      expect(state?.[0].to).toBe('skip-header')
      expect(state?.[1].label).toBe('Nav to Main')
      expect(state?.[1].to).toBe('skip-main')
      expect(state?.[2].label).toBe('Nav to Footer')
      expect(state?.[2].to).toBe('skip-footer')

      expect(container.querySelector('#skip-header')).toBeInTheDocument()
      expect(container.querySelector('#skip-main')).toBeInTheDocument()
      expect(container.querySelector('#skip-footer')).toBeInTheDocument()
    })
  })
})
