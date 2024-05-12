import React from 'react'
import { Input, Typography } from 'antd'
import { type QuestionInputPropsType, questionInputDefaultProps } from './interface'

const { Paragraph } = Typography

function QuestionInput(props: QuestionInputPropsType) {
  const { title, placeholder } = { ...questionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput
