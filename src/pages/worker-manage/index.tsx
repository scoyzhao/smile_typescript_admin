import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Popconfirm, message } from 'antd';
import './index.scss'
import PageLayout from '../../common/components/page-layout'
import { getWorkerList, deleteWorker } from '../../utils/api'
import { getUserInfo } from '../../utils';
import Edit from './Edit'

const Index: React.FC = () => {
  const [workerList, setWorkerList] = useState([])
  const [editWorker, setEditWorker] = useState({})
  const [loading, setLoading] = useState(false)
  const [editModalVisible, setVisible] = useState(false)
  const [isDel, setIsDel] = useState(false)

  const { type } = getUserInfo()

  useEffect(() => {
    async function getworkerList() {
      setLoading(true)
      const res: any = await getWorkerList()
      setLoading(false)
      const {
        code,
        message: msg,
        data,
      } = res.data
      if (code !== 200) {
        message.error(msg)
      }

      return setWorkerList(data)
    }

    getworkerList()
  }, [type, editModalVisible, isDel])

  const showEditModal = (func: string, data?: any) => {
    if (func === 'add') {
      setEditWorker({})
    } else if (func === 'edit') {
      setEditWorker(data)
    }

    setVisible(true)
  }

  const del = async ({id} : { id: number}) => {
    try {
      setIsDel(true)
      const res = await deleteWorker({ id, type })
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
      title: '名字',
      dataIndex: 'name',
    },
    {
      title: '工种',
      dataIndex: 'type',
      render: (type: string | number): string => {
        const type2Name: any = {
          0: '医生',
          1: '家政',
          2: '其他',
          4: '家电维修',
        };

        return type2Name[type]
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '手机',
      dataIndex: 'phone',
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
    <PageLayout title='工作人员管理'>
      <Card
        loading={loading}
      >
        <Button
          style={{ marginBottom: '20px' }}
          type='primary'
          onClick={() => showEditModal('add')}
        >
          新增工作人员
          </Button>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={workerList}
        />
      </Card>
      {
        editModalVisible && <Edit isShow={editModalVisible} data={editWorker} handleCancel={() => setVisible(false)} />
      }
    </PageLayout>
  )
}

export default Index
