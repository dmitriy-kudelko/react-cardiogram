import React, { MouseEventHandler, useCallback, useRef } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import Cardiogram from '.'
import defaults from './lib/defaults'
import { ManualBangHandle } from './lib/types'

type CardiogramType = typeof Cardiogram

const Meta: ComponentMeta<CardiogramType> = {
  title: 'Cardiogram',
  component: Cardiogram,
  args: {
    ...defaults,
    beatFrequency: 1000
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
