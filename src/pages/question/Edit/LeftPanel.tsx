import React from 'react'
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentLib from './ComponentLib'

const LeftPanel: React.FC = () => {
  const tabsItems = [
    {
      key: 'componentsLib',
      label: (
        <span>
          <AppstoreAddOutlined
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },

    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          图层
        </span>
      ),
      children: <div>图层</div>,
    },
  ]

  return <Tabs defaultActiveKey="componentsLib" items={tabsItems} />
}

export default LeftPanel
