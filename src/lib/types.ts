import { RendererOptions } from './CanvasRenderer'
import { CardiogramOptions } from './Cardiogram'

export type CardiogramProps = RendererOptions & CardiogramOptions

export interface ManualBangHandle {
  bang: () => void
}
