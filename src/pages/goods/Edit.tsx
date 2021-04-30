/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import { Modal, Form, Input, Radio, message } from 'antd'
import { addWorker, editGood } from '../../utils/api'

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
  const { ID, ORI_PRICE } = data

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const newId = ID ? ID : Math.floor(Math.random() * 10000 + 5)
      const res = ID ? await editGood({
        editGood: Object.assign(data, {
          ORI_PRICE: values.ORI_PRICE,
        }),
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
      title={ID ? '编辑商品价格' : '新增工作人员'}
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
          ORI_PRICE,
        }}
      >
        <Form.Item name="ORI_PRICE" label="商品价格" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Edit
