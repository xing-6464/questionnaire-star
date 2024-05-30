import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './StatHeader.module.scss'
import { Button, Space, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

const { Title } = Typography

function StatHeader() {
  const nav = useNavigate()
  const { id } = useParams()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>统计</Title>
          </Space>
        </div>
        <div className={styles.main}>中</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
