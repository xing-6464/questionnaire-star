import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from 'antd'

const Home: FC = () => {
  const nav = useNavigate()

  function clickHandler() {
    nav('/login')
  }

  return (
    <div>
      <p>Home</p>
      <div>
        <Button onClick={clickHandler}>登录</Button>
      </div>
    </div>
  )
}

export default Home
