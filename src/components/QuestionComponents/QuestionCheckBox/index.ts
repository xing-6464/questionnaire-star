import Component from './Component'
import PropComponent from './PropComponent'
import { questionCheckBoxDefaultProps } from './interface'

export * from './interface'

export default {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: questionCheckBoxDefaultProps,
}
