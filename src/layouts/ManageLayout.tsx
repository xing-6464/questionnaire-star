import React, { FC, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Divider, message } from 'antd'
import styles from './ManageLayout.module.scss'
import { createQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  // const [loading, setLoading] = useState(false)
  // async function handleCreateClick() {
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   const id = data || {}
  //   if (id) {
  //     nav(`/question/edit/${id}`)
  //     message.success('创建成功')
  //   }

  //   setLoading(false)
  // }

  const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id || result._id}`)
      message.success('创建成功')
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={
              <PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            }
            onClick={handleCreateClick}
            loading={loading}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={
              <BarsOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            }
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={
              <StarOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            }
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={
              <DeleteOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            }
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
