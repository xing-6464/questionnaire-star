import React from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents'
import { useAppDispatch } from '../../../store/hooks'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProp = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: React.FC = () => {
  const dispatch = useAppDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />

  const { type, props } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  const { PropComponent } = componentConf

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return

    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, props: newProps }))
  }

  return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
