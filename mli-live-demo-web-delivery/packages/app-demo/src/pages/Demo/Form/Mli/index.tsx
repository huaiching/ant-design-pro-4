import { PageContainer, ProForm } from '@ant-design/pro-components'
import { MliFormDateTimeRangePicker, MliFormDigit, MliFormMoney, MliFormPassword, MliFormRadio, MliFormSelect, MliFormSlider, MliFormSwitch, MliFormText, MliFormTextArea, MliFormTimePicker, MliFormTreeSelect, MliFormUpload } from '@mli-csmo/base'
import { message } from 'antd'

const FormMli: React.FC = () => {
  const demo = 'demo.form'

  return (
    <PageContainer title="所有元件表單範例">
      <ProForm
        layout="vertical"
        onFinish={async (values) => {
          console.log('表單提交：', values)
          message.success('提交成功')
        }}
      >
        <ProForm.Group title="基本資訊">
          <MliFormText
            name="username"
            moduleName={demo}
            columnName="username"
            required />
          <MliFormPassword
            name="password"
            moduleName={demo}
            columnName="password"
            required />
          <MliFormTextArea
            name="description"
            moduleName={demo}
            columnName="description"
          />
        </ProForm.Group>

        <ProForm.Group title="數字與金額">
          <MliFormDigit
            name="age"
            min={0}
            max={100}
            moduleName={demo}
            columnName="age"
          />
          <MliFormMoney
            name="salary"
            locale="zh-TW"
            min={0}
            moduleName={demo}
            columnName="salary"
          />
          <MliFormSlider
            name="score"
            min={0}
            max={100}
            moduleName={demo}
            columnName="score"
          />
        </ProForm.Group>

        <ProForm.Group title="時間與日期">
          <MliFormDateTimeRangePicker
            name="dateTimeRange"
            moduleName={demo}
            columnName="dateTimeRange"
          />
          <MliFormTimePicker
            name="alarmTime"
            moduleName={demo}
            columnName="alarmTime"
          />
          <MliFormDateTimeRangePicker
            name="workHours"
            moduleName={demo}
            columnName="workHours"
          />
        </ProForm.Group>

        <ProForm.Group title="選擇與切換">
          <MliFormRadio.Group
            name="gender"
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' }
            ]}
            moduleName={demo}
            columnName="gender"
          />
          <MliFormSelect
            name="role"
            options={[
              { label: '管理員', value: 'admin' },
              { label: '使用者', value: 'user' }
            ]}
            moduleName={demo}
            columnName="role"
          />
          <MliFormSwitch
            name="isActive"
            moduleName={demo}
            columnName="isActive"
          />
          <MliFormTreeSelect
            name="department"
            fieldProps={{
              treeData: [
                {
                  title: '研發部',
                  value: 'dev',
                  children: [{ title: '前端', value: 'frontend' }]
                },
                {
                  title: '行銷部',
                  value: 'marketing'
                }
              ],
              showSearch: true,
              treeDefaultExpandAll: true
            }}
            moduleName={demo}
            columnName="department"
          />
        </ProForm.Group>

        <ProForm.Group title="上傳與輸入">
          <MliFormUpload
            name="profile"
            title='上傳圖片'
            max={1}
            fieldProps={{
              name: 'file',
              listType: 'picture-card'
            }}
            action="/upload.do"
            moduleName={demo}
            columnName="profile"
          />
          <MliFormUpload
            name="attachments"
            title='上傳檔案'
            fieldProps={{
              name: 'file',
              listType: 'text'
            }}
            action="/upload.do"
            moduleName={demo}
            columnName="attachments"
          />
        </ProForm.Group>

        {/* 若有自訂 FormRichTextEditor，可替換下方為對應元件 */}
        <MliFormTextArea
          name="richText"
          moduleName={demo}
          columnName="richText"
        />

      </ProForm>
    </PageContainer>
  )
}

export default FormMli