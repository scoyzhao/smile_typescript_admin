/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { modifyPassword } from '../../utils/api'

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

const EditPassword: React.FC<editProps> = ({ isShow, data, handleCancel }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { userNumber, password } = data

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await modifyPassword({
        userNumber,
        password,
        newPassword: values.newPassword
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
      title='修改密码'
      confirmLoading={loading}
      visible={isShow}
      onCancel={handleCancel}
      onOk={handleSubmit}
    >
      <Form
        {...layout}
        form={form}
        validateMessages={validateMessages}
      >
        <Form.Item name="newPassword" label="新密码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditPassword
