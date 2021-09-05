import {
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'
import useInterval from 'use-interval'

import {
  spikeValues,
  createBeatRange,
  getIdleBeatValue,
  getNextBeatIndex,
  getSpikeValue
} from './util'
import useWindowResize from './use-window-resize'
import CanvasRenderer from './CanvasRenderer'

interface Props {
  defaultWidth: number
  height: number
  color: string
  thickness: number
  scale: number
  cursorSize: number
  density: number
  paintInterval: number
  beatFrequency?: number
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

export interface ManualBangHandle {
  bang: () => void
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
  const [isSpike, setIsSpike] = useState<boolean>(false)

  const beatIndex = useRef<number>(0)
  const spikeIndex = useRef<number>(-1)
  const canvas = useRef<HTMLCanvasElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const beats = useRef<number[]>([])
  const renderer = useMemo<CanvasRenderer | undefined>(() => {
    const ctx = canvas.current?.getContext('2d')

    if (!ctx) {
      return
    }

    return new CanvasRenderer(ctx, {
      width,
      height,
      color,
      thickness,
      scale,
      cursorSize
    })
  }, [width, height, color, thickness, scale, cursorSize])

  // draws a spike
  const bang = useCallback(() => {
    setIsSpike(true)
  }, [])

  // exposes bang method so that it could be invoked externally vie ref.bang()
  useImperativeHandle(ref, () => ({
    bang
  }))

  const onResize = useCallback(() => {
    if (container.current) {
      const { width } = container.current.getBoundingClientRect()
      setWidth(width)

      beats.current = createBeatRange(width, density)
    }
  }, [density])

  useWindowResize(onResize)

  const setBeatValue = useCallback<(value: number) => void>((value) => {
    beats.current[beatIndex.current] = value
  }, [])

  const fillSpikeData = useCallback(() => {
    setBeatValue(getSpikeValue(spikeIndex.current))

    spikeIndex.current =
      spikeIndex.current < spikeValues.length ? spikeIndex.current + 1 : -1
  }, [setBeatValue])

  const fillIdleData = useCallback(() => {
    setBeatValue(getIdleBeatValue())
  }, [setBeatValue])

  const updateData = useCallback(() => {
    beatIndex.current = getNextBeatIndex(
      beatIndex.current,
      beats.current.length
    )

    if (spikeIndex.current >= 0 || isSpike) {
      fillSpikeData()
      setIsSpike(false)
    } else {
      fillIdleData()
    }
  }, [isSpike, fillSpikeData, fillIdleData])

  const paint = useCallback(() => {
    renderer?.draw(beats.current, beatIndex.current)
  }, [renderer])

  useInterval(() => {
    updateData()
    paint()
  }, paintInterval)

  useInterval(() => {
    if (beatFrequency) {
      bang()
    }
  }, beatFrequency || null)

  return {
    width,
    canvas,
    container
  }
}

export default useCardiogram
