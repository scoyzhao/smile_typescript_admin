import React, { useState, useEffect } from 'react'
import { Card, Col, Row, message } from 'antd';
import './index.scss'
import PageLayout from '../../common/components/page-layout'
import { getCommiteNameById } from '../../utils/api'
import { getUserInfo } from '../../utils/public'

const Home: React.FC = () => {
  const [name, setName] = useState('')
  const { commiteId, userName: admin } = getUserInfo()

  useEffect(() => {
    async function getCommiteName() {
      const res: any = await getCommiteNameById({ id: commiteId })
      const {
        code,
        message: msg,
        data,
      } = res.data
      if (code !== 200) {
        return message.error(msg)
      }

      setName(data)
    }

    getCommiteName()
  })

  return (
    <PageLayout title={`你好！${name}社区的 ${admin}`}>
      <Overview />
    </PageLayout>
  )
}

const Overview = () => {
  function getRadom(unit: number) {
    const limit = (Math.pow(10, unit) * Math.random()).toString();
    return parseInt(limit);
  }
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={6}>
          <Card title="总访问量" extra={<span className="day">日</span>}>
            <p className="viewdata">{getRadom(4)}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="总评论数" extra={<span className="day">日</span>}>
            <p className="viewdata">{getRadom(2)}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="总留言数" extra={<span className="day">日</span>}>
            <p className="viewdata">{getRadom(2)}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="关于页访问量" extra={<span className="day">日</span>}>
            <p className="viewdata">{getRadom(4)}</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}


export default Home
