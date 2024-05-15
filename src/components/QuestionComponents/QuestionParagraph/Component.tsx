import React from 'react'
import { type QuestionParagraphPropsType, questionParagraphDefaultProps } from './interface'
import { Typography } from 'antd'

const { Paragraph } = Typography

const Component: React.FC<QuestionParagraphPropsType> = props => {
  const { text = '', isCenter = false } = { ...questionParagraphDefaultProps, ...props }

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {text}
    </Paragraph>
  )
}

export default Component
