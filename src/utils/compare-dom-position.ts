enum DOMRelativePositions {
  Void = 1,
  After = 2,
  Before = 4,
  Inside = 8,
  Contains = 16,
  Same = 32,
}

export const isAfter = (position: number): Boolean => [
  DOMRelativePositions.After,
  DOMRelativePositions.Inside,
  DOMRelativePositions.After | DOMRelativePositions.Inside,
].includes(position)

export const isBefore = (position: number): Boolean => [
  DOMRelativePositions.Before,
  DOMRelativePositions.Contains,
  DOMRelativePositions.Before | DOMRelativePositions.Contains,
].includes(position)

export const evalPosition = (position: number): number => isAfter(position) ? 1 : isBefore(position) ? -1 : 0
