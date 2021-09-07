export interface RenderOptions {
  width: number
  height: number
  color: string
  thickness: number
  scale: number
  cursorSize: number
}

export default class CanvasRenderer {
  private readonly ctx: CanvasRenderingContext2D
  private readonly options: RenderOptions

  constructor(ctx: CanvasRenderingContext2D, options: RenderOptions) {
    this.ctx = ctx
    this.options = options
  }

  render(beats: number[], beatIndex: number): void {
    const { ctx } = this
    const { width, height, scale } = this.options

    this.setRenderOptions()
    ctx.clearRect(0, 0, width, height)

    const baseY = height / 2
    const { length } = beats
    const yFactor = height * (scale / 100)

    ctx.beginPath()
    ctx.moveTo(0, baseY)

    let x = 0
    let y = 0
    let currentIndex = (beatIndex + 1) % length
    const step = width / length

    beats.forEach((value, index) => {
      x = index * step
      y = baseY - beats[currentIndex] * yFactor
      currentIndex = (currentIndex + 1) % length

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

  private setRenderOptions(): void {
    const { ctx } = this
    const { color, thickness } = this.options

    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = thickness
  }
}
