import Component from './Component'
import PropComponent from './PropComponent'
import { questionInfoDefaultProps } from './interface'

export * from './interface'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: questionInfoDefaultProps,
}
