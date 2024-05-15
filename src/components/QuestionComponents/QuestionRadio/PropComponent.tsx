import React, { useEffect } from 'react'
import { QuestionRadioPropsType } from './interface'
import { Checkbox, Form, Input, Select } from 'antd'

const PropComponent: React.FC<QuestionRadioPropsType> = props => {
  const { title, isVertical, value, options = [], onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      value,
      options,
    })
  }, [title, isVertical, value, options])

  function handleValuesChange() {
    onChange?.(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="value" label="默认选中">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>是否垂直</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
