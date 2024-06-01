import { useRequest } from 'ahooks'
import { Typography } from 'antd'
import React, { useEffect } from 'react'
import { getComponentStatService } from '../../../services/stat'
import { useParams } from 'react-router-dom'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

function ChartStat(props: PropsType) {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()
  const [stat, setStat] = React.useState([])

  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  function genStatElem() {
    if (!selectedComponentId) return <div>选中组件</div>
    return <div>{JSON.stringify(stat)}</div>
  }

  return (
    <>
      <Title level={3}>统计列表</Title>
      <div>{genStatElem()}</div>
    </>
  )
}

export default ChartStat
