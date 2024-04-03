import React, { FC, useEffect, useRef, useState } from 'react'
import { useTitle, useDebounceFn } from 'ahooks'
import { Spin, Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'

const { Title } = Typography

const List: FC = () => {
  useTitle('小星问卷 - 我的问卷')

  const containerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams()
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const ele = containerRef.current
      if (ele == null) return

      const domRect = ele.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        console.log('执行加载')
      }
    },
    {
      wait: 1000,
    }
  )
  // 页面加载，或者 url 参数变化时，触发加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  // 页面滚动时，试加载
  useEffect(() => {
    // if (haveMoreData) {
    window.addEventListener('scroll', tryLoadMore)
    // }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content} style={{ height: '2000px' }}>
        {/* {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })} */}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>loadMore... 上滑加载更多</div>
      </div>
    </>
  )
}

export default List
