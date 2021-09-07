import React, { forwardRef } from 'react'

import useCardiogram from './lib/use-cardiogram'

import defaults from './lib/defaults'
import { CardiogramProps, ManualBangHandle } from './lib/types'

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
