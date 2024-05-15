import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { type QuestionTextareaPropsType, questionTextareaDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionTextarea: FC<QuestionTextareaPropsType> = props => {
  const { title, placeholder } = { ...questionTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input.TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionTextarea
