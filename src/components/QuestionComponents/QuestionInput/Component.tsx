import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { type QuestionInputPropsType, questionInputDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = props => {
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
