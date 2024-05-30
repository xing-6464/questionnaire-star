import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { Button, Result, Spin } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { isPublished } = useGetPageInfo()

  // 修改标题
  useTitle('问卷统计')

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Spin />
      </div>
    )
  }

  if (!isPublished) {
    return (
      <div style={{ flex: 1 }}>
        <Result
          status="warning"
          title="该页面未发布"
          extra={
            <Button type="primary" onClick={() => nav(-1)}>
              返回
            </Button>
          }
        ></Result>
      </div>
    )
  }

  return (
    <div>
      <p>stat page</p>
      {loading ? <p>loading</p> : <p></p>}
    </div>
  )
}

export default Stat
