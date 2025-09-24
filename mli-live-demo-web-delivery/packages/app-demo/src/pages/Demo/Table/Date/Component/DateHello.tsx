import { FooterToolbar, PageContainer, ProForm } from '@ant-design/pro-components'
import { Button } from 'antd'
import { history, useIntl, useLocation } from 'umi'

const Hello: React.FC = () => {
  const { formatMessage } = useIntl()
  const query: any = new URLSearchParams(useLocation().search)

  const jumpUrl = () => {
    if (query.get('redirectTo')) {
      history.replace(query.get('redirectTo'))
    } else {
      history.go(-1)
    }
  }

  return (
    <PageContainer>
      <h3>此頁面用於測試保存條件的功能，請直接按右下方的返回按鈕</h3>
      <ProForm
        layout="horizontal"
        className="mli-detail-form"
        submitter={{
          render: () => (
            <FooterToolbar>
              <Button onClick={() => jumpUrl()} key="back">
                {formatMessage({ id: 'dateTable.hello.button.back' })}
              </Button>
            </FooterToolbar>
          )
        }}
        grid
        labelWrap
      >
      </ProForm>
    </PageContainer>
  )
}

export default Hello