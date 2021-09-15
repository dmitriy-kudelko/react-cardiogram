type BeatParams = [number, number]

export class Util {
  private readonly spikeValues: BeatParams[] = [
    [0.1, 0.1],
    [0.1, 0],
    [0.3, 0.7],
    [0.1, -0.05],
    [0.3, -0.8],
    [0.1, -0.05],
    [0.1, -0.05],
    [0.1, 0.15]
  ]

  private readonly idleBeatParams: BeatParams = [0.05, -0.025]

  getSpikeValuesCount(): number {
    return this.spikeValues.length
  }

  getBeatValue(factor: number, offset: number): number {
    return Math.random() * factor + offset
  }

  getIdleBeatValue(): number {
    return this.getBeatValue(...this.idleBeatParams)
  }

  createBeatRange(width: number, density: number): number[] {
    const count = Math.max(100, Math.floor(width / density))

    return new Array(count).fill(0).map(this.getIdleBeatValue.bind(this))
  }

  getSpikeValue(index: number): number {
    const params = this.spikeValues[index]

    if (params) {
      const [factor, offset] = params

      return this.getBeatValue(factor, offset)
    }

    return 0
  }

  getNextBeatIndex(currentIndex: number, beatCount: number): number {
    if (currentIndex < beatCount - 1) {
      return currentIndex + 1
    }

    return 0
  }

  constraintWithinRange(value: number, min: number, max: number): number {
    return Math.max(Math.min(value, max), min)
  }
}

export default new Util()
