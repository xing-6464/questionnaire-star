import React from 'react'
import styles from './EditCanvas.module.scss'

// 静态展示
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import { Spin } from 'antd'

type Props = {
  loading: boolean
}

function EditCanvas(props: Props) {
  const { loading } = props
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles['component']}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles['component']}>
          <QuestionInput />
        </div>
      </div>
    </div>
  )
}

export default EditCanvas
