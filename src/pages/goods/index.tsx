import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Popconfirm, message } from 'antd';
import './index.scss'
import PageLayout from '../../common/components/page-layout'
import { getGoodsList, deleteGood } from '../../utils/api'
import { getUserInfo } from '../../utils';

import Edit from './Edit'

const Index: React.FC = () => {
  const [GoodsList, setGoodsList] = useState([])
  const [editGood, setEditGood] = useState({})
  const [loading, setLoading] = useState(false)
  const [editModalVisible, setVisible] = useState(false)
  const [isDel, setIsDel] = useState(false)

  const { type } = getUserInfo()

  useEffect(() => {
    async function queryGoodList() {
      setLoading(true)
      const res: any = await getGoodsList()
      setLoading(false)
      const {
        code,
        message: msg,
        data,
      } = res.data
      if (code !== 200) {
        message.error(msg)
      }

      return setGoodsList(data)
    }

    queryGoodList()
  }, [type, isDel])

  const showEditModal = (func: string, data?: any) => {
    if (func === 'add') {
      setEditGood({})
    } else if (func === 'edit') {
      setEditGood(data)
    }

    setVisible(true)
  }

  const del = async ({id} : { id: number}) => {
    try {
      setIsDel(true)
      const res = await deleteGood({ id, type })
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
      dataIndex: 'NAME',
    },
    {
      title: '价格',
      dataIndex: 'ORI_PRICE',
    },
    {
      title: '图片',
      dataIndex: 'PICTURE_COMPERSS_PATH',
      render: (src: string) => <img alt='' src={src} height='30px' width='30px' />
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
    <PageLayout title='商品列表'>
      <Card
        loading={loading}
      >
        {/* <Button
          style={{ marginBottom: '20px' }}
          type='primary'
          onClick={() => showEditModal('add')}
        >
          新增工作人员
          </Button> */}
        <Table
          rowKey='id'
          columns={columns}
          dataSource={GoodsList}
        />
      </Card>
      {
        editModalVisible && <Edit isShow={editModalVisible} data={editGood} handleCancel={() => setVisible(false)} />
      }
    </PageLayout>
  )
}

export default Index
