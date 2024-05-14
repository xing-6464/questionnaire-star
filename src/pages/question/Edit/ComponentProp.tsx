import React from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'

const NoProp = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: React.FC = () => {
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />

  const { type, props } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  const { PropComponent } = componentConf

  return <PropComponent {...props} />
}

export default ComponentProp
