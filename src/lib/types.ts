import { RenderOptions } from './CanvasRenderer'

export type CardiogramProps = Partial<RenderOptions>

export interface ManualBangHandle {
  bang: () => void
}
