import React, { useState, useEffect } from 'react'
import { Card, Table, Switch, message } from 'antd';
import './index.scss'
import PageLayout from '../../common/components/page-layout'
import { getLifeOrderList, editLifeOrder } from '../../utils/api'

const Index: React.FC = () => {
  const [lifeOrderList, setLifeOrderList] = useState([])
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    async function queryOrderList() {
      setLoading(true)
      const res: any = await getLifeOrderList()
      setLoading(false)
      const {
        code,
        message: msg,
        data,
      } = res.data
      if (code !== 200) {
        message.error(msg)
      }

      return setLifeOrderList(data)
    }

    queryOrderList()
  }, [isEdit])

  const handleStatusChange = async (checked: boolean, record: any) => {
    try {
      setIsEdit(true)
      const status = checked ? 2 : 0
      const res = await editLifeOrder({
        editOrder: Object.assign(record, {
          status,
        })
      })

      const { code, message: msg } = res.data
      setIsEdit(false)
      if (code !== 200) {
        message.error(msg)
      }
    } catch (error) {
      setIsEdit(false)
      message.error(error.toString())
    }
  }

  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      render: (type: string | number): string => {
        const type2Name: any = {
          0: '医生',
          1: '家政',
          2: '其他',
          3: '跑腿',
          4: '家电维修',
        };

        return type2Name[type]
      }
    },
    {
      title: '姓名',
      dataIndex: 'userNumber',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      // title: '状态',
      // dataIndex: 'status',
      // render: (status: string | number): string => {
      //   const status2Name: any = {
      //     0: '未完成',
      //     // 1: '待确认',
      //     2: '已完成',
      //   };

      //   return status2Name[status]
      // }
      title: '状态',
      // dataIndex: 'status',
      // render: (status: string | number): string => {
      //   const status2Name: any = {
      //     1: '待处理',
      //     2: '已完成',
      //   };

      //   return status2Name[status]
      // }
      render: (record: any) => {
        return (
          <Switch
            checkedChildren="已完成"
            unCheckedChildren="未完成"
            checked={record.status === 2}
            onChange={(checked) => handleStatusChange(checked, record)}
          />
        )
      }
    },
  ];

  return (
    <PageLayout title='生活订单'>
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
          rowKey='_id'
          columns={columns}
          dataSource={lifeOrderList}
        />
      </Card>
    </PageLayout>
  )
}

export default Index
