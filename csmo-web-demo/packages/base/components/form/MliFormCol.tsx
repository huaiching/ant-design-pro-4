import * as React from 'react'
import { Col } from 'antd'
import type { ColProps } from 'antd/lib/grid/col'

type FormColProps = {
  colSize?: number
  colProps?: ColProps
  children?: React.ReactNode
}

const MliFormCol: React.FC<FormColProps> = ({ children, colProps }) => {
  return <Col {...colProps}>{children}</Col>
}

export default MliFormCol
