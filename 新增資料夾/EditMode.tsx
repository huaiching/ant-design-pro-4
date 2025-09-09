import React from 'react'
import { Alert } from 'antd'

interface AlertEditModeProps {
  onClose: () => void
}

const AlertEditMode: React.FC<AlertEditModeProps> = ({ onClose }) => (
  <Alert
    message="編輯模式"
    type="warning"
    showIcon
    closable
    onClose={onClose}
    style={{ marginBottom: 16 }}
  />
)

export default AlertEditMode