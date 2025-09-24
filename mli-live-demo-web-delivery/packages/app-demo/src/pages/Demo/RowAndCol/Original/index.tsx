import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components'
import { Col, Row } from 'antd'

const OriginalRowAndCol: React.FC = () => {

  return (
    <PageContainer>
      <ProForm onFinish={async (values) => console.log(values)}>
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              name="firstName"
              label="名字"
              placeholder="請輸入名字"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="lastName"
              label="姓氏"
              placeholder="請輸入姓氏"
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <ProFormText
              name="email"
              label="電子郵件"
              placeholder="請輸入 Email"
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="phone"
              label="電話"
              placeholder="請輸入電話"
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="address"
              label="地址"
              placeholder="請輸入地址"
            />
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  )
}

export default OriginalRowAndCol