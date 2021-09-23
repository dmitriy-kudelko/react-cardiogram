export interface CardiogramOptions {
  width: number
  density: number
}

type Beat = [number, number]

export default class Cardiogram {
  private readonly beats: number[] = []
  private beatIndex = 0
  private spikeIndex = -1
  private isSpike = false
  private readonly minBeatCount = 100
  private readonly idleBeat: Beat = [0.05, -0.025]
  private readonly spikeBeats: Beat[] = [
    [0.1, 0.1],
    [0.1, 0],
    [0.3, 0.7],
    [0.1, -0.05],
    [0.3, -0.8],
    [0.1, -0.05],
    [0.1, -0.05],
    [0.1, 0.15]
  ]

  constructor(private readonly options: CardiogramOptions) {
    this.beats = this.initBeatRange()
  }

  public renderSpike(): void {
    this.isSpike = true
  }

  public updateData(): void {
    this.setBeatIndex()

    if (this.spikeIndex >= 0 || this.isSpike) {
      this.fillSpikeData()
      this.isSpike = false
    } else {
      this.fillIdleData()
    }
  }

  public getData(): number[] {
    return this.beats
  }

  public getBeatIndex(): number {
    return this.beatIndex
  }

  private static getBeatValue(factor: number, offset: number): number {
    return Math.random() * factor + offset
  }

  private static getNextBeatIndex(
    currentIndex: number,
    beatCount: number
  ): number {
    if (currentIndex < beatCount - 1) {
      return currentIndex + 1
    }

    return 0
  }

  private getIdleBeatValue(): number {
    return Cardiogram.getBeatValue(...this.idleBeat)
  }

  private createBeatRange(width: number, density: number): number[] {
    const count = Math.max(this.minBeatCount, Math.floor(width / density))

    return new Array(count).fill(0).map(this.getIdleBeatValue.bind(this))
  }

  private setBeatValue(value: number): void {
    this.beats[this.beatIndex] = value
  }

  private setBeatIndex(): void {
    this.beatIndex = Cardiogram.getNextBeatIndex(
      this.beatIndex,
      this.beats.length
    )
  }

  private setSpikeIndex(): void {
    this.spikeIndex =
      this.spikeIndex < this.spikeBeats.length ? this.spikeIndex + 1 : -1
  }

  private initBeatRange(): number[] {
    const { width, density } = this.options

    return this.createBeatRange(width, density)
  }

  private fillIdleData(): void {
    this.setBeatValue(this.getIdleBeatValue())
  }

  private fillSpikeData() {
    this.setBeatValue(this.getSpikeValue(this.spikeIndex))
    this.setSpikeIndex()
  }

  private getSpikeValue(index: number): number {
    const params = this.spikeBeats[index]

    if (params) {
      const [factor, offset] = params

      return Cardiogram.getBeatValue(factor, offset)
    }

    return 0
  }
}
