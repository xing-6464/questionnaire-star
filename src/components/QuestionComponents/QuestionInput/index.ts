// 问卷输入框组件

import Component from './Component'
import PropComponent from './PropComponent'
import { questionInputDefaultProps } from './interface'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInput',
  Component,
  PropComponent,
  defaultProps: questionInputDefaultProps,
}
