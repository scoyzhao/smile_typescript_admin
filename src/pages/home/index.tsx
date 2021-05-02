import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Table, message } from 'antd';
import './index.scss'
import PageLayout from '../../common/components/page-layout'
import { getCommiteNameById, getOrderListByCommiteIdAndTime, getCommiteUserList } from '../../utils/api'
import { getUserInfo, nowDate } from '../../utils/public'

const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [userList, setUserList] = useState<any>([])
  const [lunchList, setLunchList] = useState<any>([])
  const [dinnerList, setDinnerList] = useState<any>([])
  const { commiteId, userName: admin, type } = getUserInfo()

  useEffect(() => {
    async function getCommiteName() {
      const res: any = await getCommiteNameById({ id: commiteId })
      const {
        code,
        // message: msg,
        data,
      } = res.data
      if (code !== 200) {
        // return message.error(msg)
        return false;
      }

      setName(data)
    }

    async function getuserList() {
      const res: any = await getCommiteUserList({ type, commiteId })
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

    async function getLunchAndDinnerList() {
      const res: any = await getOrderListByCommiteIdAndTime({ commiteId, time: nowDate() })
      const {
        code,
        message: msg,
        data,
      } = res.data
      if (code !== 200) {
        message.error(msg)
      }

      const lunchOrder: any = []
      const dinnerOrder: any = []
      data.map((order: any) => {
        const { type, status } = order
        if ((type === 5 || type === 7) && status === 2) {
          lunchOrder.push(order)
        }

        if ((type === 6 || type === 7) && status === 2) {
          dinnerOrder.push(order)
        }

        return true
      })

      setLunchList(lunchOrder)
      setDinnerList(dinnerOrder)
    }

    getCommiteName()
    getuserList()
    getLunchAndDinnerList()
  }, [commiteId, type])

  return (
    <PageLayout title={`你好！${name}社区的 ${admin}`}>
      <Overview dinnerList={dinnerList} lunchList={lunchList} userList={userList} />
    </PageLayout>
  )
}

const Overview = ({ dinnerList, lunchList, userList }: { dinnerList: any[], lunchList: any[], userList: any[] }) => {
  const getUserInfo = (userNumber: string): any => {
    console.log("🚀 ~ file: index.tsx ~ line 89 ~ getUserInfo ~ userNumber", userNumber)
    return userList.filter(el => el.userNumber === userNumber)
  }

  const columns = [
    {
      title: '姓名',
      render: (record: any) => {
        const user = getUserInfo(record.userNumber)
        const { userName } = user[0]
        return userName
      }
    },
    {
      title: '手机',
      render: (record: any) => {
        const user = getUserInfo(record.userNumber)
        const { phone } = user[0]
        return phone
      }
    },
    {
      title: '住址',
      render: (record: any) => {
        const user = getUserInfo(record.userNumber)
        const { address } = user[0]
        return address
      }
    },
  ];

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={12}>
          <Card title="今日午餐派送名单">
            <Table
              columns={columns}
              dataSource={lunchList}
            />
          </Card>
        </Col>
        <Col span={12} >
          <Card title="今日晚餐派送名单">
            <Table
              columns={columns}
              dataSource={dinnerList}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}


export default Home
