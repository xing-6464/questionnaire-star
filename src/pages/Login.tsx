import React, { FC, useEffect } from 'react'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router'
import { loginService } from '../services/user'
import { useRequest } from 'ahooks'
import { setToken } from '../utils/user-token'

const { Title } = Typography
const USERNAME = 'USERNAME'
const PASSWORD = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME, username)
  localStorage.setItem(PASSWORD, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME)
  localStorage.removeItem(PASSWORD)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME),
    password: localStorage.getItem(PASSWORD),
  }
}

const Login: FC = () => {
  const [form] = Form.useForm()

  const nav = useNavigate()

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)

      return data
    },
    {
      manual: true,
      onSuccess(res) {
        const { token = '' } = res
        // 存储 token
        setToken(token)
        message.success('登录成功')
        // 登录成功导航到我的问卷
        nav('/')
      },
      onError(error) {
        message.error('登录失败，请检查用户名和密码')
      },
    }
  )

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  function onFinish(values: any) {
    const { username, password, remember } = values || {}

    run(username, password)
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
