import React, { useState } from 'react'

import classNames from 'classnames'
import { Button, Input, Space, message } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import styles from './Layers.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useAppDispatch } from '../../../store/hooks'
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

function Layers() {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useAppDispatch()

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏组件')
      return
    }
    if (fe_id !== selectedId) {
      setChangingTitleId('')
      dispatch(changeSelectedId(fe_id))
      return
    }

    // 点击修改标题
    setChangingTitleId(fe_id)
  }

  // 修改标题
  function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return

    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  // 切换 隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  // 切换 锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }))
  }

  // SortableContainer 组件的 items 属性，需要每个 item 都有 id 属性
  const componentListWithId = componentList.map(c => ({ ...c, id: c.fe_id }))

  // 排序函数结束回调
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map(component => {
        const { fe_id, title, isHidden, isLocked } = component

        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassNames = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div className={titleClassNames} onClick={() => handleTitleClick(fe_id)}>
                {fe_id === changingTitleId ? (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlurCapture={() => setChangingTitleId('')}
                  />
                ) : (
                  title
                )}
              </div>
              <div className={styles.handler}>
                <Space direction="horizontal">
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    icon={
                      <EyeInvisibleOutlined
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    }
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    icon={
                      <LockOutlined
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    }
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => changeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
