export const beatPoints = [
  [0.1, 0.1],
  [0.1, 0],
  [0.3, 0.7],
  [0.1, -0.05],
  [0.3, -0.8],
  [0.1, -0.05],
  [0.1, -0.05],
  [0.1, 0.15]
]

export const createBeatRange = (width: number): number[] => {
  const count = Math.max(100, Math.floor(width / 2))

  return new Array(count).fill(0)
}

export const getBeatValue = (factor: number, offset: number): number =>
  Math.random() * factor + offset

export const getSpikePointValue = (index: number): number => {
  const params = beatPoints[index]

  if (params) {
    const [factor, offset] = params

    return getBeatValue(factor, offset)
  }

  return 0
}

export const ellipse = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  a: number,
  b: number
): void => {
  ctx.save()
  ctx.beginPath()
  ctx.translate(x, y)
  ctx.scale(a / b, 1)
  ctx.arc(0, 0, b, 0, Math.PI * 2, true)
  ctx.restore()
  ctx.closePath()
}
