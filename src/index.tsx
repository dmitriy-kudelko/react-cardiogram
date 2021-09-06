import React, { forwardRef } from 'react'

import useCardiogram, { ManualBangHandle } from './lib/use-cardiogram'
import { RenderOptions } from './lib/CanvasRenderer'

interface CardiogramProps extends Partial<RenderOptions> {
  paintInterval?: number
  beatFrequency?: number
  density?: number
}

const Cardiogram = forwardRef<ManualBangHandle, CardiogramProps>(
  (
    {
      width: defaultWidth = 500,
      height = 100,
      paintInterval = 30,
      color = '#22ff22',
      thickness = 2,
      scale = 35,
      cursorSize = 3,
      density = 2,
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
