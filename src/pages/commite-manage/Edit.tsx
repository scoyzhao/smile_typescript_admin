/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { addCommite, editCommite } from '../../utils/api'

type editProps = {
  isShow: boolean
  data: any
  handleCancel: any
  type: number
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
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

const Edit: React.FC<editProps> = ({ isShow, data, handleCancel, type }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { id, name, address } = data

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const newId = id !== undefined? id : Math.floor(Math.random() * 10000 + 5)
      const res = id !== undefined? await editCommite({
        editCommit: {
          name: values.name, id: newId,
          address: values.address,
        },
        type,
      }) :
        await addCommite({ name: values.name, id: newId, type, address: values.address })

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
      title={id !== undefined? '编辑社区' : '新增社区'}
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
          name,
          address,
        }}
      >
        <Form.Item name="name" label="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Edit
