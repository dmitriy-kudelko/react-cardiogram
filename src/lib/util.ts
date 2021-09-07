type BeatParams = [number, number]

export const spikeValues: BeatParams[] = [
  [0.1, 0.1],
  [0.1, 0],
  [0.3, 0.7],
  [0.1, -0.05],
  [0.3, -0.8],
  [0.1, -0.05],
  [0.1, -0.05],
  [0.1, 0.15]
]

const idleBeatParams: BeatParams = [0.05, -0.025]

export const getBeatValue = (factor: number, offset: number): number =>
  Math.random() * factor + offset

export const getIdleBeatValue = (): number => getBeatValue(...idleBeatParams)

export const createBeatRange = (width: number, density: number): number[] => {
  const count = Math.max(100, Math.floor(width / density))

  return new Array(count).fill(0).map(getIdleBeatValue)
}

export const getSpikeValue = (index: number): number => {
  const params = spikeValues[index]

  if (params) {
    const [factor, offset] = params

    return getBeatValue(factor, offset)
  }

  return 0
}

export const getNextBeatIndex = (
  currentIndex: number,
  beatCount: number
): number => (currentIndex + 1) % beatCount

export const constraintWithinRange = (
  value: number,
  min: number,
  max: number
): number => Math.max(Math.min(value, max), min)
