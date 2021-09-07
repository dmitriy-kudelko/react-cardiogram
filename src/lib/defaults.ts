import { RenderOptions } from './CanvasRenderer'
import { OtherOptions } from './types'

const defaults: RenderOptions & OtherOptions = {
  width: 500,
  height: 100,
  color: '#22ff22',
  thickness: 2,
  scale: 35,
  cursorSize: 3,
  density: 2,
  paintInterval: 30
}

export default defaults
