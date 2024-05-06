import React, { FC, useEffect, useRef, useState } from 'react'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Spin, Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'

const { Title } = Typography

const List: FC = () => {
  useTitle('小星问卷 - 我的问卷')

  const [searchParams] = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const haveMoreData = total > list.length

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
      })

      return data
    },
    {
      manual: true,
      onSuccess(res) {
        const { list: l = [], total = 0 } = res
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const ele = containerRef.current
      if (ele == null) return

      const domRect = ele.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
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
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

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
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q

            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>loadMore... 上滑加载更多</div>
      </div>
    </>
  )
}

export default List
