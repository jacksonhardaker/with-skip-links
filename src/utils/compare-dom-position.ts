export const isAfter = (position: number): Boolean => [
  Node.DOCUMENT_POSITION_PRECEDING, //2
  Node.DOCUMENT_POSITION_CONTAINS, //8
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS, // 10
].includes(position)

export const isBefore = (position: number): Boolean => [
  Node.DOCUMENT_POSITION_FOLLOWING, //4
  Node.DOCUMENT_POSITION_CONTAINED_BY, //16
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY, //20
].includes(position)

export const evalPosition = (position: number): number => isAfter(position) ? 1 : isBefore(position) ? -1 : 0
