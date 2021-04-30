import React, { useState, useEffect } from 'react'
import { Card, Table, Switch, message } from 'antd';
import './index.scss'
import PageLayout from '../../common/components/page-layout'
import { getMealOrderList, editMealOrder } from '../../utils/api'
import { getUserInfo } from '../../utils';

const Index: React.FC = () => {
  const [lifeOrderList, setLifeOrderList] = useState([])
  const [ isEdit, setIsEdit ] = useState(false)
  const [loading, setLoading] = useState(false)

  const { commiteId } = getUserInfo()

  useEffect(() => {
    async function queryOrderList() {
      setLoading(true)
      const res: any = await getMealOrderList({ commiteId })
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
  }, [commiteId, isEdit])

  const handleStatusChange = async (checked: boolean, record: any) => {
    try {
      setIsEdit(true)
      const status = checked? 2: 1
      const res = await editMealOrder({
        editOrder: Object.assign(record, {
          status,
        })
      })

      const { code, message: msg } = res.data
      setIsEdit(false)
      if (code !== 200) {
        message.error(msg)
      }
    } catch(error) {
      setIsEdit(false)
      message.error(error.toString())
    }
  }

  const columns = [
    {
      title: '日期',
      dataIndex: 'time',
    },
    {
      title: '姓名',
      dataIndex: 'userNumber',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (type: string | number): string => {
        const type2Name: any = {
          5: '午餐',
          6: '晚餐',
          7: '全餐',
        };

        return type2Name[type]
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
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
            unCheckedChildren="待处理"
            checked={record.status === 2}
            onChange={(checked) => handleStatusChange(checked, record)}
          />
        )
      }
    },
  ];

  return (
    <PageLayout title='社区订餐'>
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
