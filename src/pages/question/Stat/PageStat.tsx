import React, { useState } from 'react'
import type { PropsType } from './types'
import { useRequest } from 'ahooks'
import { getQuestionStatListService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { Spin, Typography } from 'antd'

const { Title } = Typography

function PageStat(props: PropsType) {
  const { id = '' } = useParams()

  const [total, setTotal] = useState()
  const [list, setList] = useState([])
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page: 1, pageSize: 10 })
      return res
    },
    {
      onSuccess(res) {
        const { total, list = [] } = res
        setTotal(total)
        setList(list)
      },
    }
  )

  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <Spin />
        </div>
      )}
    </div>
  )
}

export default PageStat
