import {
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import useWindowResize from './use-window-resize'
import Cardiogram, { CardiogramOptions } from '../Cardiogram'
import CanvasRenderer, { RendererOptions } from '../CanvasRenderer'
import { CardiogramProps, ManualBangHandle } from '../types'
import IntervalManager from '../IntervalManager'
import { constraintWithinRange } from '../util'

interface Props extends Omit<CardiogramProps, 'width'> {
  defaultWidth: number
  ref: Ref<ManualBangHandle>
}

interface ReturnType {
  width: number
  canvas: Ref<HTMLCanvasElement>
  container: Ref<HTMLDivElement>
}

interface UseCardiogram {
  (props: Props): ReturnType
}

const useCardiogram: UseCardiogram = ({
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
}) => {
  const [width, setWidth] = useState<number>(defaultWidth)

  const renderer = useRef<CanvasRenderer>()
  const canvas = useRef<HTMLCanvasElement>(null)
  const container = useRef<HTMLDivElement>(null)

  // draws a spike
  const bang = useCallback(() => {
    renderer.current?.renderSpike()
  }, [])

  // exposes bang method so that it could be invoked externally via ref.bang()
  useImperativeHandle(ref, () => ({
    bang
  }))

  const onResize = useCallback(() => {
    if (container.current) {
      const { width } = container.current.getBoundingClientRect()
      setWidth(width)
    }
  }, [])

  useWindowResize(onResize)

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d')

    if (!ctx) {
      return
    }

    const rendererOptions: RendererOptions = {
      width,
      height,
      color,
      thickness,
      scale: constraintWithinRange(scale, 5, 100),
      cursorSize,
      paintInterval,
      beatFrequency
    }

    const cardiogramOptions: CardiogramOptions = {
      width,
      density
    }

    renderer.current = new CanvasRenderer(
      ctx,
      new Cardiogram(cardiogramOptions),
      new IntervalManager(),
      rendererOptions
    )

    return () => {
      renderer.current?.destroy()
    }
  }, [
    width,
    height,
    color,
    thickness,
    scale,
    cursorSize,
    density,
    paintInterval,
    beatFrequency
  ])

  return {
    width,
    canvas,
    container
  }
}

export default useCardiogram
