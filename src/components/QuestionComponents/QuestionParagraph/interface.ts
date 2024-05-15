export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean

  // 属性表单
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const questionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落',
  isCenter: false,
}
