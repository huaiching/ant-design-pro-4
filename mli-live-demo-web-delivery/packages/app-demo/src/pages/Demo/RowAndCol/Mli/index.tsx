import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components'
import { MliFormRow, MliFormCol } from '@mli-csmo/base'

const MliRowAndCol: React.FC = () => {

  return (
    <PageContainer>
      <ProForm onFinish={async (values) => console.log(values)}>
        <MliFormRow>
          <MliFormCol>
            <ProFormText
              name="firstName"
              label="名字"
              placeholder="請輸入名字"
            />
          </MliFormCol>
          <MliFormCol>
            <ProFormText
              name="lastName"
              label="姓氏"
              placeholder="請輸入姓氏"
            />
          </MliFormCol>
        </MliFormRow>

        <MliFormRow>
          <MliFormCol>
            <ProFormText
              name="email"
              label="電子郵件"
              placeholder="請輸入 Email"
            />
          </MliFormCol>
          <MliFormCol>
            <ProFormText
              name="phone"
              label="電話"
              placeholder="請輸入電話"
            />
          </MliFormCol>
          <MliFormCol>
            <ProFormText
              name="address"
              label="地址"
              placeholder="請輸入地址"
            />
          </MliFormCol>
        </MliFormRow>
      </ProForm>
    </PageContainer>
  )
}

export default MliRowAndCol