import React from 'react'
import { StoryObj, Meta } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionTextarea/Component'

export default {
  title: 'Question/QuestionTextarea',
  component: Component,
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}
Default.args = {}

export const SetProps: Story = {}
SetProps.args = {
  title: 'Custom title',
  placeholder: 'Type here...',
}
