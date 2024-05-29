import React, { useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useAppDispatch } from '../../../store/hooks'
import { resetPageInfo } from '../../../store/pageInfoReducer'

function PageSetting() {
  const dispatch = useAppDispatch()
  const pageInfo = useGetPageInfo()
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>

      <Form.Item label="描述" name="desc">
        <Input.TextArea placeholder="请输入描述" />
      </Form.Item>

      <Form.Item label="样式代码" name="css">
        <Input.TextArea placeholder="请输入样式代码" />
      </Form.Item>

      <Form.Item label="脚本代码" name="js">
        <Input.TextArea placeholder="请输入脚本代码" />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
