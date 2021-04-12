import {
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { debounce } from 'lodash-es'
import useEventListener from '@use-it/event-listener'
import useInterval from 'use-interval'

import {
  beatPoints,
  createBeatRange,
  ellipse,
  getBeatValue,
  getSpikePointValue
} from './util'

interface UseCardiogram {
  (props: {
    defaultWidth: number
    height: number
    color: string
    paintInterval: number
    beatFrequency: number | null
    ref: Ref<ManualBangHandle>
  }): {
    width: number
    canvas: Ref<HTMLCanvasElement>
    container: Ref<HTMLDivElement>
  }
}

export interface ManualBangHandle {
  bang: () => void
}

const useCardiogram: UseCardiogram = ({
  defaultWidth,
  height,
  color,
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

  // draws a spike
  const bang = useCallback(() => {
    setIsSpike(true)
  }, [])

  // exposes bang method so that it could be invoked externally vie ref.bang()
  useImperativeHandle(ref, () => ({
    bang
  }))

  // resizes canvas to fit all the available width
  const handleResize = useCallback(
    debounce(() => {
      if (container.current) {
        const { width } = container.current.getBoundingClientRect()
        setWidth(width)
        beats.current = createBeatRange(width)
      }
    }, 100),
    []
  )

  // sets initial width
  useEffect(() => {
    handleResize()
  }, [handleResize])

  useEventListener('resize', handleResize)

  const setPointValue = useCallback((value) => {
    beats.current[beatIndex.current] = value
  }, [])

  const fillBeatData = useCallback(() => {
    setPointValue(getSpikePointValue(spikeIndex.current))

    spikeIndex.current =
      spikeIndex.current < beatPoints.length ? spikeIndex.current + 1 : -1
  }, [setPointValue])

  const fillRandomData = useCallback(() => {
    setPointValue(getBeatValue(0.05, -0.025))
  }, [setPointValue])

  const updateData = useCallback(() => {
    let newIndex = beatIndex.current + 1

    if (newIndex >= beats.current.length) {
      newIndex = 0
    } else {
      newIndex++
    }

    beatIndex.current = newIndex

    if (spikeIndex.current >= 0 || isSpike) {
      fillBeatData()
      setIsSpike(false)
    } else {
      fillRandomData()
    }
  }, [isSpike, fillBeatData, fillRandomData])

  const paint = useCallback(() => {
    const context = canvas.current?.getContext('2d')

    if (!context) {
      return
    }

    context.clearRect(0, 0, width, height)
    const baseY = height / 2
    const { length } = beats.current
    const step = (width - 5) / length
    const yFactor = height * 0.35
    let heartIndex = (beatIndex.current + 1) % length
    context.strokeStyle = color
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(0, baseY)
    let x = 0
    let y = 0
    for (let i = 0; i < length; i++) {
      x = i * step
      y = baseY - beats.current[heartIndex] * yFactor
      context.lineTo(x, y)
      heartIndex = (heartIndex + 1) % length
    }
    context.stroke()
    context.closePath()
    context.beginPath()
    context.fillStyle = color
    ellipse(context, x - 1, y - 1, 2, 2)
    context.fill()
    context.closePath()
  }, [width, height, color])

  useInterval(() => {
    updateData()
    paint()
  }, paintInterval)

  useInterval(() => {
    if (beatFrequency) {
      bang()
    }
  }, beatFrequency)

  return {
    width,
    canvas,
    container
  }
}

export default useCardiogram
