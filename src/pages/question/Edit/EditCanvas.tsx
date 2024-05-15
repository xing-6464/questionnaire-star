import React from 'react'
import { Spin } from 'antd'
import classNames from 'classnames'

import styles from './EditCanvas.module.scss'
// 静态展示
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { useAppDispatch } from '../../../store/hooks'

type Props = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null

  const { Component } = componentConf

  return <Component {...props} />
}

function EditCanvas(props: Props) {
  const { loading } = props
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useAppDispatch()

  function handleClick(event: React.MouseEvent, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked } = c

          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const lockedClassName = styles.locked
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          })
          return (
            <div className={wrapperClassName} key={fe_id} onClick={e => handleClick(e, fe_id)}>
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas
