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

  draw(beats: number[], beatIndex: number): void {
    const { ctx } = this
    const { width, height, color, thickness, scale } = this.options
    ctx.clearRect(0, 0, width, height)

    const baseY = height / 2
    const { length } = beats
    const yFactor = height * (scale / 100)

    ctx.strokeStyle = color
    ctx.lineWidth = thickness
    ctx.beginPath()
    ctx.moveTo(0, baseY)

    let x = 0
    let y = 0
    let heartIndex = (beatIndex + 1) % length
    const step = (width - 5) / length

    for (let i = 0; i < length; i++) {
      x = i * step
      y = baseY - beats[heartIndex] * yFactor
      heartIndex = (heartIndex + 1) % length

      ctx.lineTo(x, y)
    }

    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.fillStyle = color

    this.drawCursor(x - 1, y - 1)

    ctx.fill()
    ctx.closePath()
  }

  drawCursor(x: number, y: number): void {
    const { ctx } = this

    ctx.save()
    ctx.beginPath()
    ctx.translate(x, y)
    ctx.arc(0, 0, this.options.cursorSize, 0, Math.PI * 2, true)
    ctx.restore()
    ctx.closePath()
  }
}
