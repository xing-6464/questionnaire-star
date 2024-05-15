import React from 'react'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useAppDispatch } from '../../../store/hooks'
import {
  changeComponentHidden,
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const { selectedId: fe_id, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  // 删除
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  // 隐藏
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id, isHidden: true }))
  }

  // 锁定
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id }))
  }

  // 复制
  function copy() {
    dispatch(copySelectedComponent())
  }

  // 粘贴
  function paste() {
    // todo: 粘贴功能
    dispatch(pasteCopiedComponent())
  }

  // TODO 上移/下移, 撤销/重做

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>{' '}
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
