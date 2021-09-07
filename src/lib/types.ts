import { RenderOptions } from './CanvasRenderer'

export type CardiogramProps = Partial<RenderOptions> & Partial<OtherOptions>

export interface OtherOptions {
  paintInterval: number
  density: number
  beatFrequency?: number
}

export interface ManualBangHandle {
  bang: () => void
}
