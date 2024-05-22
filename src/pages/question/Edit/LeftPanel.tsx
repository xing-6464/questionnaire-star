import React from 'react'
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const LeftPanel: React.FC = () => {
  const tabsItems = [
    {
      key: 'componentsLib',
      label: (
        <span>
          <AppstoreAddOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },

    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ]

  return <Tabs defaultActiveKey="componentsLib" items={tabsItems} />
}

export default LeftPanel
