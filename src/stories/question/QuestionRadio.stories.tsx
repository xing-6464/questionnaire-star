import React from 'react'
import { StoryObj, Meta } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionRadio/Component'

export default {
  title: 'Question/QuestionRadio',
  component: Component,
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}
Default.args = {}

export const SetProps: Story = {}
SetProps.args = {
  title: 'hello',
  options: [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ],
  value: 'v1',
  isVertical: true,
}
