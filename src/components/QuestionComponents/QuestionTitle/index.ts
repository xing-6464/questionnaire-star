// 问卷输入框组件

import Component from './Component'
import { questionTitleDefaultProps } from './interface'

export * from './interface'

export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  defaultProps: questionTitleDefaultProps,
}
