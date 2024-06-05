import React from 'react'
import { StoryObj, Meta } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionTitle/Component'

export default {
  title: 'Question/QuestionTitle',
  component: Component,
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}
Default.args = {}

export const SetProps: Story = {}
SetProps.args = {
  text: 'hello',
  level: 2,
  isCenter: true,
}
