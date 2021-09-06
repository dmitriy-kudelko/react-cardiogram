import React, { MouseEventHandler, useCallback, useRef } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import Cardiogram from './index'
import { ManualBangHandle } from './lib/use-cardiogram'

type CardiogramType = typeof Cardiogram

const Meta: ComponentMeta<CardiogramType> = {
  title: 'Cardiogram',
  component: Cardiogram,
  args: {
    height: 100,
    color: '#22ff22',
    scale: 35,
    density: 2,
    thickness: 2,
    paintInterval: 30,
    beatFrequency: 1000,
    cursorSize: 3
  }
}

export default Meta

export const Default: ComponentStory<CardiogramType> = ({ ...args }) => {
  const ref = useRef<ManualBangHandle>(null)

  const onClick = useCallback<MouseEventHandler>(() => {
    ref.current?.bang()
  }, [])

  return (
    <div style={{ padding: 24, background: '#383e42' }}>
      <Cardiogram {...args} {...{ ref }} />

      <button type="button" {...{ onClick }}>
        Bang
      </button>
    </div>
  )
}

Default.storyName = 'Cardiogram'
