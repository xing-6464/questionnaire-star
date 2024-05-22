import React from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

import styles from './Layers.module.scss'
import classNames from 'classnames'
import { message } from 'antd'
import { useAppDispatch } from '../../../store/hooks'
import { changeSelectedId } from '../../../store/componentsReducer'

function Layers() {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useAppDispatch()

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏组件')
      return
    }
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
      return
    }
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
              {title}
            </div>
            <div className={styles.handler}>按钮</div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
