import React, { forwardRef } from 'react'

import { CardiogramProps, ManualBangHandle } from './lib/types'
import useCardiogram from './lib/hooks/use-cardiogram'

import defaults from './lib/defaults'

const Cardiogram = forwardRef<ManualBangHandle, Partial<CardiogramProps>>(
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
