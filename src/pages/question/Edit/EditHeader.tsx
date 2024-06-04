import React, { ChangeEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Typography, Space, Input, message } from 'antd'
import styles from './EditHeader.module.scss'
import { EditOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useAppDispatch } from '../../../store/hooks'
import { changePageTitle } from '../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionService } from '../../../services/question'

const { Title } = Typography

// 标题组件
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
      <Button
        icon={<EditOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
        type="text"
        onClick={() => setEditState(true)}
      />
    </Space>
  )
}

// 保存按钮
const SaveButton = () => {
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
    }
  )

  // 自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [pageInfo, componentList],
    { wait: 1000 }
  )

  useKeyPress(['ctrl.s', 'mate.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  return (
    <Button
      onClick={save}
      loading={loading}
      icon={
        !loading ? (
          <SaveOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        ) : null
      }
    >
      保存
    </Button>
  )
}

// 发布按钮
const PublishButton = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, // 发布状态
      })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功')
        nav(`/question/stat/${id}`) // 跳转到统计页面
      },
    }
  )
  return (
    <Button type="primary" onClick={pub} loading={loading}>
      发布
    </Button>
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
            <Button
              type="link"
              icon={
                <LeftOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              }
              onClick={() => nav(-1)}
            >
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
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
