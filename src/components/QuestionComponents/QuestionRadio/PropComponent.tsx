import React, { useEffect } from 'react'
import { OptionType, QuestionRadioPropsType } from './interface'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

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
    const newValues = form.getFieldsValue()
    const { options = [] } = newValues
    options.forEach((opt: OptionType) => {
      if (opt.value) return
      opt.value = nanoid(5)
    })
    onChange?.(newValues)
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
      <Form.Item name="options" label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项内容' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()

                            let num = 0
                            options.forEach((opt: OptionType) => {
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
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  block
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
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
