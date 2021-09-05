import React, { forwardRef } from 'react'

import useCardiogram, { ManualBangHandle } from './lib/use-cardiogram'

interface Props {
  width?: number
  height?: number
  paintInterval?: number
  color?: string
  scale?: number
  cursorSize?: number
  thickness?: number
  density?: number
  beatFrequency?: number
}

const Cardiogram = forwardRef<ManualBangHandle, Props>(
  (
    {
      width: defaultWidth = 500,
      height = 100,
      paintInterval = 30,
      color = '#22ff22',
      thickness = 2,
      scale = 0.35,
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
