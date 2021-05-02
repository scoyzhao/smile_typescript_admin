import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Popconfirm, message } from 'antd';
import './index.scss'
import PageLayout from '../../common/components/page-layout'
import { getMenuList } from '../../utils/api'
import Edit from './Edit'

const Index: React.FC = () => {
  const [menuList, setMenuList] = useState([])
  const [editMenu, setEditMenu] = useState({})
  const [loading, setLoading] = useState(false)
  const [editModalVisible, setVisible] = useState(false)

  useEffect(() => {
    async function getmenuList() {
      setLoading(true)
      const res: any = await getMenuList()
      setLoading(false)
      const {
        code,
        message: msg,
        data,
      } = res.data
      if (code !== 200) {
        return message.error(msg)
      }

      return setMenuList(data)
    }

    getmenuList()
  }, [editModalVisible])

  const showEditModal = (func: string, data?: any) => {
    if (func === 'add') {
      setEditMenu({})
    } else if (func === 'edit') {
      setEditMenu(data)
    }

    setVisible(true)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '名字',
      dataIndex: 'name',
    },
    {
      title: '图片',
      dataIndex: 'url',
      render: (src: string) => <img alt='' src={src} height='100px' width='100px' />
    },
    {
      title: '操作',
      render: (record: any) => (
        <>
          <Button
            type='primary'
            onClick={() => showEditModal('edit', record)}
          >
            编辑
          </Button>
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
          dataSource={menuList}
        />
      </Card>
      {
        editModalVisible && <Edit isShow={editModalVisible} data={editMenu} handleCancel={() => setVisible(false)} />
      }
    </PageLayout>
  )
}

export default Index
