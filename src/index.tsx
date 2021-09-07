import React, { forwardRef } from 'react'

import useCardiogram, { ManualBangHandle } from './lib/use-cardiogram'
import { RenderOptions } from './lib/CanvasRenderer'

interface CardiogramProps extends Partial<RenderOptions>, Partial<Options> {
  beatFrequency?: number
}

interface Options {
  paintInterval: number
  density: number
}

export const defaults: RenderOptions & Options = {
  width: 500,
  height: 100,
  color: '#22ff22',
  thickness: 2,
  scale: 35,
  cursorSize: 3,
  density: 2,
  paintInterval: 30
}

const Cardiogram = forwardRef<ManualBangHandle, CardiogramProps>(
  (
    {
      width: defaultWidth = defaults.width,
      height = defaults.height,
      paintInterval = defaults.paintInterval,
      color = defaults.color,
      thickness = defaults.thickness,
      scale = defaults.scale,
      cursorSize = defaults.cursorSize,
      density = defaults.density,
      beatFrequency
    },
    ref
  ) => {
    const { width, container, canvas } = useCardiogram({
      defaultWidth,
      height,
      color,
      thickness,
      scale,
      cursorSize,
      density,
      paintInterval,
      beatFrequency,
      ref
    })

    return (
      <div ref={container}>
        <canvas {...{ width, height }} ref={canvas} />
      </div>
    )
  }
)

export default Cardiogram
