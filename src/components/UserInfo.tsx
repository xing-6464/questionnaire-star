import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'

const userInfo = () => {
  // 对于已经登录的用户，显示什么？后面再做

  return (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  )
}

export default userInfo
