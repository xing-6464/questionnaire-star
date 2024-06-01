import React, { useState } from 'react'
import type { PropsType } from './types'
import { useRequest } from 'ahooks'
import { getQuestionStatListService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { Pagination, Table, Typography } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import Loading from '../../../components/Loading'
import { STAT_PAGE_SIZE } from '../../../constant'

const { Title } = Typography

function PageStat(props: PropsType) {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { id = '' } = useParams()

  const [total, setTotal] = useState()
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize })
      return res
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res
        setTotal(total)
        setList(list)
      },
    }
  )

  const { componentList } = useGetComponentInfo()
  const columns = componentList.map(c => {
    const { fe_id, title, type, props = {} } = c

    const colTitle = props.title || title

    return {
      // title: colTitle,
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })
  const dataSource = list.map((i: any) => ({ ...i, key: i._id }))
  const TableElement = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )

  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && <Loading />}
      {!loading && TableElement}
    </div>
  )
}

export default PageStat
