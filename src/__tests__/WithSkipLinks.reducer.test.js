import { reducer } from "../WithSkipLinks";
import { ActionType, Action } from "../types";

const mockCurrentState = [
  { label: 'Navigate Here', to: 'here' },
  { label: 'Navigate There', to: 'there' },
  { label: 'Navigate Anywhere', to: 'anywhere' },
]

const callReducer = (action) => reducer(mockCurrentState, action)

describe('WithSkipLinks reducer', () => {

  test('should throw an error when called with an unrecognized action type', () => {
    expect(() => {
      callReducer({
        type: 'UNKNOWN',
      })
    }).toThrow('Unknown action: UNKNOWN');
  })

  test('should return a cleared state when called with a ClearAction', () => {
    expect(callReducer({
      type: ActionType.clear,
    })).toStrictEqual([])
  })

  describe('register action', () => {
    test('should return the state unchanged when the SkipLink already exists', () => {
      const newState = callReducer({
        type: ActionType.register,
        payload: {
          label: 'Navigate Here',
          to: 'here',
        }
      })

      expect(newState).toStrictEqual(mockCurrentState)
    })

    test('should return the state unchanged when there is no payload', () => {
      const newState = callReducer({
        type: ActionType.register,
      })

      expect(newState).toStrictEqual(mockCurrentState)
    })

    test('should append the new SkipLink to the end, given no ref', () => {
      const newSkipLink = {
        label: 'She loves me',
        to: 'yeah yeah yeah',
      }
      const newState = callReducer({
        type: ActionType.register,
        payload: newSkipLink
      })

      expect(newState).toStrictEqual([...mockCurrentState, newSkipLink])
    })

    describe('sorting', () => {
      // setup DOM
      const DOM = document.createElement('div')
      DOM.innerHTML = `
      <a href="/one">One</a>
      <a href="/two">Two</a>
      <a href="/three">Three</a>
      <a href="/four">Four</a>
      <a href="/five">Five</a>
    `
      const [one, two, three, four, five] = Array.from(DOM.querySelectorAll('a'))
      const mockCurrentStateWithRef = [
        { label: 'Navigate Here', to: 'here', ref: one },
        { label: 'Navigate There', to: 'there', ref: two },
        { label: 'Navigate Anywhere', to: 'anywhere', ref: four },
      ]

      test('should return an ordered state when the new SkipLink should NOT be the last', () => {
        const newSkipLink = {
          label: 'She loves me',
          to: 'yeah yeah yeah',
          ref: three,
        }
        const newState = reducer(mockCurrentStateWithRef, {
          type: ActionType.register,
          payload: newSkipLink
        })

        expect(newState).not.toStrictEqual([...mockCurrentStateWithRef, newSkipLink])
        expect(newState).toStrictEqual([
          mockCurrentStateWithRef[0],
          mockCurrentStateWithRef[1],
          newSkipLink,
          mockCurrentStateWithRef[2],
        ])
      })

      test('should return an ordered state when the new SkipLink SHOULD be the last', () => {
        const newSkipLink = {
          label: 'She loves me',
          to: 'yeah yeah yeah',
          ref: five,
        }
        const newState = reducer(mockCurrentStateWithRef, {
          type: ActionType.register,
          payload: newSkipLink
        })

        expect(newState).toStrictEqual([
          mockCurrentStateWithRef[0],
          mockCurrentStateWithRef[1],
          mockCurrentStateWithRef[2],
          newSkipLink,
        ])
      })

    })

  })
})
