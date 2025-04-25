import * as React from 'react'
import { Row } from 'antd'
import { RowProps } from 'antd/lib/grid/row'

const colTrans = (span: number, size: number) => {
  return span * size > 24 ? 24 : span * size
}
type MliFormRowProps = {
  style?: React.CSSProperties
} & RowProps

const MliFormRow: React.FC<MliFormRowProps> = (props) => {
  const { style, children } = props
  return (
    <Row style={{ width: '100%', ...style }} gutter={32} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const colSize = child.props.colSize ?? 1
          return React.cloneElement(child, {
            colProps: {
              xl: colTrans(6, colSize),
              lg: colTrans(8, colSize),
              md: colTrans(12, colSize),
              xs: 24
            }
          })
        }
        return child
      })}
    </Row>
  )
}

export default MliFormRow
