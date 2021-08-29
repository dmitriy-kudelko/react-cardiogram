import React, { forwardRef } from 'react'

import useCardiogram, { ManualBangHandle } from './lib/use-cardiogram'

interface Props {
  width?: number
  height?: number
  paintInterval?: number
  color?: string
  beatFrequency: number | null
}

const Cardiogram = forwardRef<ManualBangHandle, Props>(
  (
    {
      width: defaultWidth = 500,
      height = 100,
      paintInterval = 30,
      color = '#22ff22',
      beatFrequency
    },
    ref
  ) => {
    const { width, container, canvas } = useCardiogram({
      defaultWidth,
      height,
      color,
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
