import React from 'react'
import { Button, message } from 'antd';
import './index.scss'
interface TittleProps {
  title: string
}

const logout = () =>{
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  message.info('已退出')
  window.location.href = '/login'
}

function HeaderTittle(props: TittleProps) {
  return (
    <>
      <div className="header-title">
        {props.title}
        <Button
          style={{
            margin: '10px 20px',
            float: 'right'
          }}
          type="primary"
          danger
          onClick={logout}
        >
          退出登录
        </Button>
      </div>
    </>
  )
}

export default HeaderTittle
