// 问卷输入框组件

import Component from './Component'
import PropComponent from './PropComponent'
import { questionTextareaDefaultProps } from './interface'

export * from './interface'

export default {
  title: '多行输入框',
  type: 'questionTextarea',
  Component,
  PropComponent,
  defaultProps: questionTextareaDefaultProps,
}
