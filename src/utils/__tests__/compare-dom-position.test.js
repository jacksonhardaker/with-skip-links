import { isAfter, isBefore, evalPosition } from '../compare-dom-position'

describe('isAfter function', () => {
  test('returns true when preceding, contains, or both', () => {
    expect(isAfter(Node.DOCUMENT_POSITION_PRECEDING)).toEqual(true);
    expect(isAfter(Node.DOCUMENT_POSITION_CONTAINS)).toEqual(true);
    expect(isAfter(Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS)).toEqual(true);
  })

  test('returns false when NOT preceding, contains, or both', () => {
    expect(isAfter(Node.DOCUMENT_POSITION_FOLLOWING)).toEqual(false);
    expect(isAfter(Node.DOCUMENT_POSITION_CONTAINED_BY)).toEqual(false);
    expect(isAfter(Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY)).toEqual(false);
    expect(isAfter(Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)).toEqual(false);
    expect(isAfter(Node.DOCUMENT_POSITION_DISCONNECTED)).toEqual(false);
  })
})

describe('isBefore function', () => {
  test('returns true when following, contained by, or both', () => {
    expect(isBefore(Node.DOCUMENT_POSITION_FOLLOWING)).toEqual(true);
    expect(isBefore(Node.DOCUMENT_POSITION_CONTAINED_BY)).toEqual(true);
    expect(isBefore(Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY)).toEqual(true);
  })

  test('returns false when NOT following, contained by, or both', () => {
    expect(isBefore(Node.DOCUMENT_POSITION_PRECEDING)).toEqual(false);
    expect(isBefore(Node.DOCUMENT_POSITION_CONTAINS)).toEqual(false);
    expect(isBefore(Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS)).toEqual(false);
    expect(isBefore(Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)).toEqual(false);
    expect(isBefore(Node.DOCUMENT_POSITION_DISCONNECTED)).toEqual(false);
  })
})

describe('evalPosition function', () => {
  test('when isAfter, returns 1', () => {
    expect(evalPosition(Node.DOCUMENT_POSITION_PRECEDING)).toEqual(1)
    expect(evalPosition(Node.DOCUMENT_POSITION_CONTAINS)).toEqual(1)
    expect(evalPosition(Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS)).toEqual(1)
  })

  test('when isBefore, returns -1', () => {
    expect(evalPosition(Node.DOCUMENT_POSITION_FOLLOWING)).toEqual(-1)
    expect(evalPosition(Node.DOCUMENT_POSITION_CONTAINED_BY)).toEqual(-1)
    expect(evalPosition(Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY)).toEqual(-1)
  })

  test('when neither, returns 0', () => {
    expect(evalPosition(Node.DOCUMENT_POSITION_DISCONNECTED)).toEqual(0)
    expect(evalPosition(Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)).toEqual(0)
  })

})
