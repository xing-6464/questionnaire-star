import React from 'react'
import { OptionType, QuestionCheckBoxPropsType, questionCheckBoxDefaultProps } from './interface'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const PropComponent: React.FC<QuestionCheckBoxPropsType> = props => {
  const {
    title,
    isVertical,
    list = [],
    onChange,
    disabled,
  } = { ...questionCheckBoxDefaultProps, ...props }
  const [form] = Form.useForm()

  function handleValuesChange() {
    const newValues = form.getFieldsValue()
    const { list } = newValues
    list.forEach((opt: { value: string }) => {
      if (opt.value) return
      opt.value = nanoid(5)
    })
    onChange?.(newValues)
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
      <Form.Item name="list" label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项内容' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue()

                            let num = 0
                            list.forEach((opt: OptionType) => {
                              if (opt.text === text) num++ // 记录text相同的个数, 只有一个
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('选项内容不能相同'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项内容" />
                    </Form.Item>
                    {/* 删除按钮 */}
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  block
                  onClick={() => add({ text: '', value: '', checked: false })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>是否垂直</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
