import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import Component from '../../components/QuestionComponents/QuestionInfo/Component'

export default {
  title: 'Question/QuestionInfo',
  component: Component,
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {},
}

export const SetProps: Story = {
  args: {
    title: 'hello',
    desc: 'world',
  },
}

export const DescBreakLine: Story = {
  args: {
    title: 'hello',
    desc: 'world\nworld\nworld', // 换行
  },
}
