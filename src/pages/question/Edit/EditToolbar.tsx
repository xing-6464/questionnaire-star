import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { useAppDispatch } from '../../../store/hooks'
import {
  changeComponentHidden,
  removeSelectedComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const { selectedId: fe_id, selectedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id, isHidden: true }))
  }

  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id }))
  }

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
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
