import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import { useAppDispatch } from '../../../store/hooks'
import { changeSelectedId } from '../../../store/componentsReducer'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useTitle } from 'ahooks'

const Edit: FC = () => {
  const dispatch = useAppDispatch()
  const { loading } = useLoadQuestionData()
  const { title } = useGetPageInfo()
  useTitle(`问卷编辑 - ${title}`)

  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
