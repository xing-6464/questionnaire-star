import Component from './Component'
import PropComponent from './PropComponent'
import { questionParagraphDefaultProps } from './interface'

export * from './interface'

export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: questionParagraphDefaultProps,
}
