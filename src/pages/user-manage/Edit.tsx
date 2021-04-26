/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react'
import { Modal, Radio, Form, Input, message } from 'antd'
import { editUser } from '../../utils/api'

type editProps = {
  isShow: boolean
  data: any
  handleCancel: any
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

const Edit: React.FC<editProps> = ({ isShow, data, handleCancel }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { userName, phone, userNumber, auditStatus, type, password } = data

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await editUser({
        editUser: {
          userName: values.userName,
          phone: values.phone,
          userNumber: values.userNumber,
          auditStatus: values.auditStatus,
          type: values.type,
          password: password,
        },
      })

      setLoading(false)
      const {
        message: msg,
        code,
      } = res.data
      if (code !== 200) {
        return message.error(msg)
      }

      message.success('操作成功')
      return handleCancel()
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  return (
    <Modal
      title='编辑用户'
      confirmLoading={loading}
      visible={isShow}
      onCancel={handleCancel}
      onOk={handleSubmit}
    >
      <Form
        {...layout}
        form={form}
        validateMessages={validateMessages}
        initialValues={{
          userName,
          phone,
          userNumber,
          auditStatus,
          type,
        }}
      >
        <Form.Item name="userName" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="手机号码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="userNumber" label="身份证" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="auditStatus" label="审核状态" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={0}>待审核</Radio>
            <Radio value={1}>审核通过</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="type" label="用户类型" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={0}>普通用户</Radio>
            <Radio value={1}>社区管理人员</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Edit
