import React from 'react'
import { StoryObj, Meta } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionInput/Component'

export default {
  title: 'Question/QuestionInput',
  component: Component,
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {},
}

export const SetProps: Story = {
  args: {
    title: 'Custom title',
    placeholder: 'Type here...',
  },
}
