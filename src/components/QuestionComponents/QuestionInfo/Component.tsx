import React from 'react'
import { QuestionInfoPropsType, questionInfoDefaultProps } from './interface'
import { Typography } from 'antd'

const Component: React.FC<QuestionInfoPropsType> = props => {
  const { title, desc = '' } = { ...questionInfoDefaultProps, ...props }

  const textList = desc.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography.Title style={{ fontSize: '24px' }}>{title}</Typography.Title>
      <Typography.Paragraph>
        {textList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Typography.Paragraph>
    </div>
  )
}

export default Component
