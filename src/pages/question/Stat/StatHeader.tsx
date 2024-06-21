import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './StatHeader.module.scss'
import { Button, Input, InputRef, Popover, QRCode, Space, Tooltip, Typography, message } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const { Title } = Typography

function StatHeader() {
  const nav = useNavigate()
  const { id } = useParams()

  const { title, isPublished } = useGetPageInfo()

  // 拷贝链接
  const urlInputRef = React.useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select()
    document.execCommand('copy') // 执行浏览器复制命令
    message.success('拷贝成功')
  }

  // function genLinkAndQRCodeElem() {
  //   if (!isPublished) return null

  //   // generate QR code and link
  //   const url = `http://localhost:3000/question/${id}`

  //   const QRCodeElem = (
  //     <div style={{ textAlign: 'center' }}>
  //       <QRCode value={url} size={150} />
  //     </div>
  //   )

  //   return (
  //     <Space>
  //       <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
  //       <Tooltip title="拷贝链接">
  //         <Button icon={<CopyOutlined />} onClick={copy} />
  //       </Tooltip>
  //       <Popover content={QRCodeElem}>
  //         <Button icon={<QrcodeOutlined />} />
  //       </Popover>
  //     </Space>
  //   )
  // }

  // 使用 useMemo 优化性能
  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null

    // generate QR code and link
    const url = `http://question.ixing.xyz/question/${id}`

    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button
            icon={
              <CopyOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            }
            onClick={copy}
          />
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button
            icon={
              <QrcodeOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            }
          />
        </Popover>
      </Space>
    )
  }, [id, isPublished])

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
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRCodeElem}</div>
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
