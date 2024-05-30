import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { Button, Result, Spin } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import style from './index.module.scss'
import StatHeader from './StatHeader'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { isPublished } = useGetPageInfo()

  // 修改标题
  useTitle('问卷统计')

  const Loading = () => {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Spin />
      </div>
    )
  }

  const genElement = () => {
    if (typeof isPublished === 'boolean' && !isPublished) {
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
      <>
        <div className={style.left}>left</div>
        <div className={style.main}>main</div>
        <div className={style.right}>right</div>
      </>
    )
  }

  return (
    <div className={style.container}>
      <StatHeader />
      <div className={style['content-wrapper']}>
        {loading ? <Loading /> : <div className={style.content}>{genElement()}</div>}
      </div>
    </div>
  )
}

export default Stat
