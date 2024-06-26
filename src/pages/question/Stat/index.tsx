import React, { FC, useState } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { Button, Result, Spin } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import style from './index.module.scss'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import ChartStat from './ChartStat'

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { isPublished } = useGetPageInfo()

  // 状态提升 id, type
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

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
        <div className={style.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={style.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={style.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
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
