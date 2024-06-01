import React from 'react'
import { Spin } from 'antd'

export default function Loading() {
  return (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )
}
