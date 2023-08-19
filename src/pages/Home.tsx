import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const nav = useNavigate()

  function clickHandler() {
    nav('/login')
  }

  return (
    <div>
      <p>Home</p>
      <div>
        <button onClick={clickHandler}>登录</button>
      </div>
    </div>
  )
}

export default Home
