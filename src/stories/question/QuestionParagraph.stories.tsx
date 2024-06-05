import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionParagraph/Component'

export default {
  title: 'Question/QuestionParagraph',
  component: Component,
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}
Default.args = {}

export const SetProps: Story = {}
Default.args = {
  text: 'hello',
  isCenter: true,
}

export const BreakLine: Story = {}
BreakLine.args = {
  text: 'hello\nhello\nhello',
}
