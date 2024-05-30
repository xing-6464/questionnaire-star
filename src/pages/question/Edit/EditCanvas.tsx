import React from 'react'
import { Spin } from 'antd'
import classNames from 'classnames'

import styles from './EditCanvas.module.scss'
// 静态展示
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { useAppDispatch } from '../../../store/hooks'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

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

  // 绑定快捷键
  useBindCanvasKeyPress()

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
  // SortableContainer 组件的 items 属性，需要每个 item 都有 id 属性
  const componentListWithId = componentList.map(c => ({ ...c, id: c.fe_id }))

  // 排序函数结束回调
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
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
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
