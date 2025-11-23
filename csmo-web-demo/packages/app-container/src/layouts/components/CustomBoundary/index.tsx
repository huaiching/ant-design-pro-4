import { Button, Result } from 'antd'
import React from 'react'
import { history } from 'umi'

export default class CustomBoundary extends React.Component<{
  hasError: boolean
}> {
  state = { hasError: false }

  static getDerivedStateFromError(error: any) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title="400"
          subTitle="Sorry, somthing went wrong."
          extra={
            <Button type="primary" onClick={() => history.push('/')}>
              Back Home
            </Button>
          }
        />
      )
    }
    return this.props.children
  }
}
