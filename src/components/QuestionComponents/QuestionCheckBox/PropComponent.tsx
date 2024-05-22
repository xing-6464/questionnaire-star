import React from 'react'
import { QuestionCheckBoxPropsType } from './interface'
import { Checkbox, Form, Input } from 'antd'

const PropComponent: React.FC<QuestionCheckBoxPropsType> = props => {
  const { title, isVertical, list = [], onChange, disabled } = props
  const [form] = Form.useForm()

  function handleValuesChange() {
    const values = form.getFieldsValue()
    onChange?.(values)
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>是否垂直</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
