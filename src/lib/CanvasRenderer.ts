import IntervalManager from './IntervalManager'
import Cardiogram from './Cardiogram'

interface Coordinates {
  x: number
  y: number
}

export interface RendererOptions {
  width: number
  height: number
  color: string
  thickness: number
  scale: number
  cursorSize: number
  paintInterval: number
  beatFrequency?: number
}

export default class CanvasRenderer {
  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly cardiogram: Cardiogram,
    private readonly intervalManager: IntervalManager,
    private readonly options: RendererOptions
  ) {
    this.initialize()
  }

  public destroy(): void {
    this.intervalManager.clearAll()
  }

  public renderSpike(): void {
    this.cardiogram.renderSpike()
  }

  private initialize() {
    const { paintInterval, beatFrequency } = this.options

    this.intervalManager.setInterval(() => {
      this.cardiogram.updateData()
      this.render()
    }, paintInterval)

    if (beatFrequency) {
      this.intervalManager.setInterval(() => {
        this.renderSpike()
      }, beatFrequency)
    }
  }

  private eachBeat(
    baseY: number,
    iteratee: (coords: Coordinates) => void
  ): Coordinates {
    const beats = this.cardiogram.getData()
    const beatIndex = this.cardiogram.getBeatIndex()

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
}
