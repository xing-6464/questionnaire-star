import React from 'react'
import { StoryObj, Meta } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionCheckbox/Component'

export default {
  title: 'Question/QuestionCheckbox',
  component: Component,
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {},
}

export const SetProps: Story = {
  args: {
    title: 'hello',
    list: [
      { value: 'v1', text: 't1', checked: false },
      { value: 'v2', text: 't2', checked: true },
      { value: 'v3', text: 't3', checked: true },
    ],
    isVertical: true,
  },
}
