import React from 'react'
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface'
import { Radio, Space, Typography } from 'antd'

const Component: React.FC<QuestionRadioPropsType> = props => {
  const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(opt => {
            const { value, text } = opt
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
