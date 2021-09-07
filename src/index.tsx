import React, { forwardRef } from 'react'

import useCardiogram from './lib/use-cardiogram'
import { RenderOptions } from './lib/CanvasRenderer'
import { CardiogramProps, ManualBangHandle, OtherOptions } from './lib/types'

export const defaults: RenderOptions & OtherOptions = {
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
