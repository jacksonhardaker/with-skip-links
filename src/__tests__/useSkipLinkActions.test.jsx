import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { useSkipLinkActions } from '../useSkipLinkActions'
import { WithSkipLinks } from '../WithSkipLinks'
import { ActionType } from '../types'

let actions
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn())

beforeEach(() => {
  actions = null
})

afterEach(() => {
  cleanup()
  consoleErrorSpy.mockReset()
})

const TestWrapper = (props) => {
  actions = useSkipLinkActions()
  return <>{props.children || null}</>
}

describe('useSkipLinksContent hook', () => {

  test('should throw an error when not wrapped with WithSkipLinks', () => {
    expect(() => render(<TestWrapper />)).toThrow()
    expect(actions).toEqual(null)
    expect(global.console.error).toHaveBeenCalled()
  })

  test('should return  an object with a RegisterAction and ClearAction', () => {
    render(<WithSkipLinks><TestWrapper /></WithSkipLinks>)
    expect(actions).not.toBeNull()
    expect(typeof actions?.register).toBe('function')
    expect(typeof actions?.clear).toBe('function')
  })
  
  test('should dispatch a clear action when the returned clear function is called', () => {
    const mockDispatch = jest.fn()
    jest.spyOn(React, 'useContext').mockReturnValue(mockDispatch)
    render(<WithSkipLinks><TestWrapper /></WithSkipLinks>)
    
    actions?.clear()

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.clear
    })
  })

  test('should return a function when the returned register function is called', () => {
    render(<WithSkipLinks><TestWrapper /></WithSkipLinks>)

    const mockSkipLink = {
      label: 'Navigate anywhere',
      to: '#anywhere',
    }
    
    const refFunction = actions?.register(mockSkipLink)

    expect(typeof refFunction).toBe('function')
  })

  test('should dispatch a register action when the RefFunction is called', () => {
    const mockDispatch = jest.fn()
    jest.spyOn(React, 'useContext').mockReturnValue(mockDispatch)
    render(<WithSkipLinks><TestWrapper /></WithSkipLinks>)

    const mockSkipLink = {
      label: 'Navigate anywhere',
      to: 'anywhere',
    }

    const mockElement = document.createElement('div')
    
    actions?.register(mockSkipLink)(mockElement)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.register,
      payload: {
        label: 'Navigate anywhere',
        to: 'anywhere',
        ref: mockElement,
      }
    })
  })

  test('should set the id of the passed HTML ref when the RefFunction is called', () => {
    const mockDispatch = jest.fn()
    jest.spyOn(React, 'useContext').mockReturnValue(mockDispatch)
    render(<WithSkipLinks><TestWrapper /></WithSkipLinks>)

    const mockSkipLink = {
      label: 'Navigate anywhere',
      to: 'anywhere',
    }

    const mockElement = document.createElement('div')
    
    actions?.register(mockSkipLink)(mockElement)

    expect(mockElement.id).toBe('anywhere')
  })

})
