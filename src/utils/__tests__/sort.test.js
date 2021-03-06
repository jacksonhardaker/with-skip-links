import '@testing-library/jest-dom/extend-expect'
import { sortLinks } from '../sort'
import * as util from '../compare-dom-position'

describe('element sort function', () => {
  test('should sort an unsorted list of sibling HTML elements', () => {
    const DOM = document.createElement('div')
    DOM.innerHTML = `
      <a href="/one">One</a>
      <a href="/two">Two</a>
      <a href="/three">Three</a>
      <a href="/four">Four</a>
      <a href="/five">Five</a>
    `
    const [one, two, three, four, five] = Array.from(
      DOM.querySelectorAll('a')).map(ref => 
        ({ ref, to: ref.href, label: ref.innerHTML }))

    const unsorted = [two, one, four, five, three]

    expect(unsorted[0]).not.toEqual(one)
    expect(unsorted[1]).not.toEqual(two)
    expect(unsorted[2]).not.toEqual(three)
    expect(unsorted[3]).not.toEqual(four)
    expect(unsorted[4]).not.toEqual(five)

    const sorted = sortLinks(unsorted)

    expect(sorted[0]).toEqual(one)
    expect(sorted[1]).toEqual(two)
    expect(sorted[2]).toEqual(three)
    expect(sorted[3]).toEqual(four)
    expect(sorted[4]).toEqual(five)
  })

  test('should sort an unsorted list of nested HTML elements', () => {
    const DOM = document.createElement('div')
    DOM.innerHTML = `
      <a href="/one" id="one">
        One
        <a href="/two" id="two">Two</a>
      </a>
      <a href="/three" id="three">
        Three
        <a href="/four" id="four">Four</a>
        <a href="/five" id="five">Five</a>
      </a>
    `
    const oneRef = DOM.querySelector('a#one')
    const twoRef = DOM.querySelector('a#two')
    const threeRef = DOM.querySelector('a#three')
    const fourRef = DOM.querySelector('a#four')
    const fiveRef = DOM.querySelector('a#five')

    expect(oneRef).not.toBeNull()
    expect(twoRef).not.toBeNull()
    expect(threeRef).not.toBeNull()
    expect(fourRef).not.toBeNull()
    expect(fiveRef).not.toBeNull()    

    if (oneRef && twoRef && threeRef && fourRef && fourRef) {
      const [one, two, three, four, five] = [oneRef, twoRef, threeRef, fourRef, fiveRef].map(ref => 
        ({ ref, to: '/anywhere', label: ref.id }))
      const unsorted = [two, one, four, five, three]
  
      expect(unsorted[0]).not.toEqual(one)
      expect(unsorted[1]).not.toEqual(two)
      expect(unsorted[2]).not.toEqual(three)
      expect(unsorted[3]).not.toEqual(four)
      expect(unsorted[4]).not.toEqual(five)
  
      const sorted = sortLinks(unsorted)
  
      expect(sorted[0]).toEqual(one)
      expect(sorted[1]).toEqual(two)
      expect(sorted[2]).toEqual(three)
      expect(sorted[3]).toEqual(four)
      expect(sorted[4]).toEqual(five)
    }

  })

  test('should not perform sort when items have no ref', () => {
    const spy = jest.spyOn(util, 'evalPosition')
    const skipLinksWithoutRef = [
      { label: 'one', to: 'one' },
      { label: 'two', to: 'two' },
      { label: 'three', to: 'three' },
      { label: 'four', to: 'four' },
    ]

    const result = sortLinks(skipLinksWithoutRef)

    expect(result).toStrictEqual(skipLinksWithoutRef)
    expect(util.evalPosition).not.toHaveBeenCalled()
    spy.mockClear()
  })

  test('should not perform sort when ref does not have compareDocumentPosition as an available function', () => {
    const spy = jest.spyOn(util, 'evalPosition')

    const incompleteHTMLElement = {
      ...document.createElement('div'),
      compareDocumentPosition: undefined,
    }

    const skipLinksWithNonHtmlRef = [
      { label: 'one', to: 'one', ref: incompleteHTMLElement },
      { label: 'two', to: 'two', ref: incompleteHTMLElement },
      { label: 'three', to: 'three', ref: incompleteHTMLElement },
      { label: 'four', to: 'four', ref: incompleteHTMLElement },
    ]

    const result = sortLinks(skipLinksWithNonHtmlRef)

    expect(result).toStrictEqual(skipLinksWithNonHtmlRef)
    expect(util.evalPosition).toHaveBeenCalledWith(0)
    spy.mockClear()
  })
})
