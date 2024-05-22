import React, { FC } from 'react'
import { QuestionCheckBoxPropsType, questionCheckBoxDefaultProps } from './interface'
import { Checkbox, Space, Typography } from 'antd'

const QuestionCheckBox: FC<QuestionCheckBoxPropsType> = props => {
  const { title, isVertical, list = [] } = { ...questionCheckBoxDefaultProps, ...props }

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
