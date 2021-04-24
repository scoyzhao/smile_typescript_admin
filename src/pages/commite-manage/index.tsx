import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Popconfirm, message } from 'antd';
import './index.scss'
import PageLayout from '../../common/components/page-layout'
import { getCommiteInfo, deleteCommite } from '../../utils/api'
import { getUserInfo } from '../../utils';
import Edit from './Edit'

const Index: React.FC = () => {
  const [commiteList, setCommiteList] = useState([])
  const [editCommite, setEditCommite] = useState({})
  const [loading, setLoading] = useState(false)
  const [editModalVisible, setVisible] = useState(false)
  const [isDel, setIsDel] = useState(false)

  const { type } = getUserInfo()

  useEffect(() => {
    async function getCommiteList() {
      setLoading(true)
      const res: any = await getCommiteInfo({ type })
      setLoading(false)
      const {
        code,
        message: msg,
        data,
      } = res.data
      if (code !== 200) {
        message.error(msg)
        return window.location.href = '/'
      }

      return setCommiteList(data)
    }

    getCommiteList()
  }, [type, editModalVisible, isDel])

  const showEditModal = (func: string, data?: any) => {
    if (func === 'add') {
      setEditCommite({})
    } else if (func === 'edit') {
      setEditCommite(data)
    }

    setVisible(true)
  }

  const del = async ({id} : { id: number}) => {
    try {
      setIsDel(true)
      const res = await deleteCommite({ id, type })
      const { code, message: msg } = res.data
      if (code !== 200) {
        message.error(msg)
      } else {
        message.success('操作成功')
      }

      setIsDel(false)
    } catch (error) {
      message.error(error.toString())
    }
  }

  const columns = [
    {
      title: '社区名字',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: (record: any) => (
        <>
          <Button
            type='primary'
            onClick = {() => showEditModal('edit', record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="Are you sure to delete this?"
            onConfirm={() => del(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{ marginLeft: '20px' }}
              danger
            >
              删除
          </Button>
          </Popconfirm>
        </>
      )
    },
  ];

  return (
    <PageLayout title='社区管理'>
      <Card
        loading={loading}
      >
        <Button
          style={{ marginBottom: '20px' }}
          type='primary'
          onClick={() => showEditModal('add')}
        >
          新增社区
          </Button>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={commiteList}
        />
      </Card>
      {
        editModalVisible && <Edit isShow={editModalVisible} data={editCommite} handleCancel={() => setVisible(false)} type={type} />
      }
    </PageLayout>
  )
}

export default Index
