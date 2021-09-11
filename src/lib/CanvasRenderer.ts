import {
  createBeatRange,
  getIdleBeatValue,
  getNextBeatIndex,
  getSpikeValue,
  spikeValues
} from './util'
import IntervalManager from './IntervalManager'

export interface RenderOptions {
  width: number
  height: number
  color: string
  thickness: number
  scale: number
  cursorSize: number
  density: number
  paintInterval: number
  beatFrequency?: number
}

interface Coordinates {
  x: number
  y: number
}

export default class CanvasRenderer {
  private readonly ctx: CanvasRenderingContext2D
  private readonly options: RenderOptions
  private readonly beats: number[] = []
  private beatIndex = 0
  private spikeIndex = -1
  private isSpike = false
  private intervalManager: IntervalManager

  constructor(
    ctx: CanvasRenderingContext2D,
    intervalManager: IntervalManager,
    options: RenderOptions
  ) {
    this.ctx = ctx
    this.options = options
    this.beats = createBeatRange(options.width, options.density)
    this.intervalManager = intervalManager

    this.initTimers()
  }

  public renderSpike(): void {
    this.isSpike = true
  }

  public destroy(): void {
    this.intervalManager.clearAll()
  }

  private eachBeat(
    baseY: number,
    iteratee: (coords: Coordinates) => void
  ): Coordinates {
    const { beats, beatIndex } = this
    const { length } = beats
    const { width, height, scale } = this.options
    const yFactor = height * (scale / 100)

    let x = 0
    let y = 0
    let currentIndex = (beatIndex + 1) % length
    const step = width / length

    beats.forEach((value, index) => {
      x = index * step
      y = baseY - beats[currentIndex] * yFactor
      currentIndex = (currentIndex + 1) % length

      iteratee({ x, y })
    })

    return {
      x,
      y
    }
  }

  private render(): void {
    const { ctx } = this
    const { width, height } = this.options

    this.setDrawingOptions()
    ctx.clearRect(0, 0, width, height)

    const baseY = height / 2

    ctx.beginPath()
    ctx.moveTo(0, baseY)

    const { x, y } = this.eachBeat(baseY, ({ x, y }) => {
      ctx.lineTo(x, y)
    })

    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()

    this.drawCursor(x - 1, y - 1)

    ctx.fill()
    ctx.closePath()
  }

  private drawCursor(x: number, y: number): void {
    const { ctx } = this

    ctx.save()
    ctx.beginPath()
    ctx.translate(x, y)
    ctx.arc(0, 0, this.options.cursorSize, 0, Math.PI * 2, true)
    ctx.restore()
    ctx.closePath()
  }

  private setDrawingOptions(): void {
    const { ctx } = this
    const { color, thickness } = this.options

    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = thickness
  }

  private initTimers() {
    const { paintInterval, beatFrequency } = this.options

    this.intervalManager.setInterval(() => {
      this.updateData()
      this.render()
    }, paintInterval)

    if (beatFrequency) {
      this.intervalManager.setInterval(() => {
        this.renderSpike()
      }, beatFrequency)
    }
  }

  private updateData(): void {
    this.beatIndex = getNextBeatIndex(this.beatIndex, this.beats.length)

    if (this.spikeIndex >= 0 || this.isSpike) {
      this.fillSpikeData()
      this.isSpike = false
    } else {
      this.fillIdleData()
    }
  }

  private setBeatValue(value: number): void {
    this.beats[this.beatIndex] = value
  }

  private fillIdleData(): void {
    this.setBeatValue(getIdleBeatValue())
  }

  private fillSpikeData() {
    this.setBeatValue(getSpikeValue(this.spikeIndex))
    this.spikeIndex =
      this.spikeIndex < spikeValues.length ? this.spikeIndex + 1 : -1
  }
}
