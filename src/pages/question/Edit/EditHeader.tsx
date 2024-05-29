import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Space, Input } from 'antd'
import styles from './EditHeader.module.scss'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useAppDispatch } from '../../../store/hooks'
import { changePageTitle } from '../../../store/pageInfoReducer'

const { Title } = Typography

const TitleElem = () => {
  const dispatch = useAppDispatch()
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim()
    if (!value) return
    dispatch(changePageTitle(value))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChange}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

// 编辑页面的头部
const EditHeader = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
