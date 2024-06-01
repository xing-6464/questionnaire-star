import { useRequest } from 'ahooks'
import { Typography } from 'antd'
import React, { useEffect } from 'react'
import { getComponentStatService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { ResType } from '../../../services/ajax'

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

  // 生成统计图表
  function genStatElem() {
    if (!selectedComponentId) return <div>未中组件</div>
    //  判断组件类型
    const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
    if (!StatComponent) return <div>该组件无统计图表</div>
    return <StatComponent stat={stat} />
  }

  return (
    <>
      <Title level={3}>统计列表</Title>
      <div>{genStatElem()}</div>
    </>
  )
}

export default ChartStat
