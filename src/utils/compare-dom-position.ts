const isAfter = (position: number): Boolean => [
  Node.DOCUMENT_POSITION_PRECEDING,
  Node.DOCUMENT_POSITION_CONTAINS,
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS,
].includes(position)

const isBefore = (position: number): Boolean => [
  Node.DOCUMENT_POSITION_FOLLOWING,
  Node.DOCUMENT_POSITION_CONTAINED_BY,
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY
].includes(position)

export const evalPosition = (position: number): number => isAfter(position) ? 1 : isBefore(position) ? -1 : 0
