import React from 'react'
import { type QuestionParagraphPropsType, questionParagraphDefaultProps } from './interface'
import { Typography } from 'antd'

const { Paragraph } = Typography

const Component: React.FC<QuestionParagraphPropsType> = props => {
  const { text = '', isCenter = false } = { ...questionParagraphDefaultProps, ...props }

  const textList = text.split('\n')

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

export default Component
