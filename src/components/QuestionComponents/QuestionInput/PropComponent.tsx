import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import type { QuestionInputPropsType } from './interface'

const PropComponent: React.FC<QuestionInputPropsType> = props => {
  const { title, placeholder } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  return (
    <Form layout="vertical" initialValues={{ title, placeholder }} form={form}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
