import React, { useState } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

import styles from './Layers.module.scss'
import classNames from 'classnames'
import { Input, message } from 'antd'
import { useAppDispatch } from '../../../store/hooks'
import { changeComponentTitle, changeSelectedId } from '../../../store/componentsReducer'

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

  return (
    <>
      {componentList.map(component => {
        const { fe_id, title, isHidden, isLocked } = component

        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassNames = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })

        return (
          <div key={fe_id} className={styles.wrapper}>
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
            <div className={styles.handler}>按钮</div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
