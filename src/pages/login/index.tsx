import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form'
import { RouterProps } from 'react-router'
import { login } from '../../utils/api'
import './login.scss'

function LoginForm(props: (FormProps & RouterProps)) {
  const iconColor = { color: 'rgba(0,0,0,.25)' }
  const onFinish = async (values: any) => {
    const { phone, password } = values
    const {
      data: {
        code,
        message: msg,
        data,
      }
    } = await login({ phone, password })

    if (code !== 200) {
      return message.error(msg)
    }

    const { token, user } = data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user))
    message.success('登录成功～')
    window.location.href = '/'
  };

  return (
    <div id="login">
      <Form className="login-form"
        onFinish={onFinish}
      >
        <Form.Item name="phone"
          rules={[{ required: true, message: '请输入手机号码!' }]}>
          <Input prefix={<UserOutlined style={iconColor} />} placeholder='请输入手机号码!' />
        </Form.Item>
        <Form.Item name="password"
          rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password prefix={<LockOutlined style={iconColor} />} placeholder='请输入密码!' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className="loginMask"></div>
    </div>
  )
}

export default LoginForm;
