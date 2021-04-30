/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import { Modal, Form, Input, Radio, message } from 'antd'
import { addWorker, editWorker } from '../../utils/api'

type editProps = {
  isShow: boolean
  data: any
  handleCancel: any
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

const Edit: React.FC<editProps> = ({ isShow, data, handleCancel }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { id, name, description, type } = data
  console.log("🚀 ~ file: Edit.tsx ~ line 32 ~ id", id)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const newId = id !== undefined ? id : Math.floor(Math.random() * 10000 + 5)
      const res = id !== undefined ? await editWorker({
        editWorker: {
          name: values.name,
          id: newId,
          type: values.type,
          description: values.description,
        },
      }) :
        await addWorker({
          name: values.name,
          id: newId,
          type: values.type,
          description: values.description,
        })

      setLoading(false)
      const {
        message: msg,
        code,
      } = res.data
      if (code !== 200) {
        setLoading(false)
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
      title={id !== undefined? '编辑工作人员' : '新增工作人员'}
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
          description,
          type
        }}
      >
        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="工种" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={0}>医生</Radio>
            <Radio value={1}>家政</Radio>
            <Radio value={4}>家电维修</Radio>
            <Radio value={2}>其他</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="description" label="描述" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Edit
