import Component from './Component'
import PropComponent from './PropComponent'
import { questionCheckboxDefaultProps } from './interface'
import StatComponent from './StatComponent'

export * from './interface'

export default {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  StatComponent,
  defaultProps: questionCheckboxDefaultProps,
}
