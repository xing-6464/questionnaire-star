import React, { FC } from 'react'
import { QuestionCheckboxPropsType, questionCheckboxDefaultProps } from './interface'
import { Checkbox, Space, Typography } from 'antd'

const QuestionCheckBox: FC<QuestionCheckboxPropsType> = props => {
  const { title, isVertical, list = [] } = { ...questionCheckboxDefaultProps, ...props }

  return (
    <div>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(opt => {
          const { value, text, checked } = opt

          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default QuestionCheckBox
