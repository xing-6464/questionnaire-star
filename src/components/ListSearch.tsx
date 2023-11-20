import React, { ChangeEvent, FC, useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

const ListSearch: FC = () => {
  const [value, setValue] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleSearch(value: string) {
    console.log(value)
  }

  return (
    <Search
      placeholder="输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '260px' }}
      size="large"
      allowClear
    />
  )
}

export default ListSearch
