import React, { useState, useEffect } from 'react'
import { Card, Table, Button, message } from 'antd';
import './index.scss'
import PageLayout from '../../common/components/page-layout'
import { getCommiteUserList } from '../../utils/api'
import { getUserInfo } from '../../utils';
import Edit from './Edit'
import EditPassword from './EditPassword'

const Index: React.FC = () => {
  const [userList, setUserList] = useState([])
  const [editUser, setEditUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [editModalVisible, setVisible] = useState(false)
  const [modifyPwdModalVisible, setModifyPwdVisible] = useState(false)

  const { type, commiteId } = getUserInfo()

  useEffect(() => {
    async function getCommiteList() {
      setLoading(true)
      const res: any = await getCommiteUserList({ type, commiteId })
      setLoading(false)
      const {
        code,
        message: msg,
        data,
      } = res.data
      if (code !== 200) {
        message.error(msg)
      }

      return setUserList(data)
    }

    getCommiteList()
  }, [type, commiteId, editModalVisible])

  const showEditModal = (func: string, data?: any) => {
    if (func === 'add') {
      setEditUser({})
    } else if (func === 'edit') {
      setEditUser(data)
    }

    setVisible(true)
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '手机',
      dataIndex: 'phone',
    },
    {
      title: '身份证号码',
      dataIndex: 'userNumber',
    },
    {
      title: '账号状态',
      dataIndex: 'auditStatus',
      render: (status: number) => {
        if (status === 1) {
          return (
            <span style={{ color: 'green' }}>已审核</span>
          )
        }

        return (
          <span style={{ color: 'red' }}>待审核</span>
        )
      },
    },
    {
      title: '账号类型',
      dataIndex: 'type',
      render: (status: number) => {
        if (status === 1) {
          return (
            <span style={{ color: 'green' }}>社区管理员</span>
          )
        }

        return (
          <span>普通用户</span>
        )
      },
    },
    {
      title: '地址',
      dataIndex: 'address',
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
          </Button>&nbsp;&nbsp;
          <Button
            type='primary'
            onClick={() => setModifyPwdVisible(true)}
          >
            修改密码
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
        <Table
          rowKey='id'
          columns={columns}
          dataSource={userList}
        />
      </Card>
      {
        editModalVisible && <Edit isShow={editModalVisible} data={editUser} handleCancel={() => setVisible(false)} />
      }
      {
        modifyPwdModalVisible && <EditPassword isShow={modifyPwdModalVisible} data={editUser} handleCancel={() => setModifyPwdVisible(false)} />
      }
    </PageLayout>
  )
}

export default Index
