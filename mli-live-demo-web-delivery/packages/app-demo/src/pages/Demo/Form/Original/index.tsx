import { PageContainer, ProForm, ProFormDateTimeRangePicker, ProFormDigit, ProFormMoney, ProFormRadio, ProFormSelect, ProFormSlider, ProFormSwitch, ProFormText, ProFormTextArea, ProFormTimePicker, ProFormTreeSelect, ProFormUploadButton } from "@ant-design/pro-components";
import { message } from 'antd';

const FormOriginal: React.FC = () => {

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
          <ProFormText name="username" label="帳號" placeholder="請輸入帳號" required />
          <ProFormText.Password name="password" label="密碼" placeholder="請輸入密碼" required />
          <ProFormTextArea name="description" label="描述" placeholder="請輸入描述" />
        </ProForm.Group>

        <ProForm.Group title="數字與金額">
          <ProFormDigit name="age" label="年齡" min={0} max={100} />
          <ProFormMoney name="salary" label="薪資" locale="zh-TW" min={0} />
          <ProFormSlider name="score" label="評分" min={0} max={100} />
        </ProForm.Group>

        <ProForm.Group title="時間與日期">
          <ProFormDateTimeRangePicker name="dateTimeRange" label="活動期間" />
          <ProFormTimePicker name="alarmTime" label="提醒時間" />
          <ProFormDateTimeRangePicker name="workHours" label="工作時段" />
        </ProForm.Group>

        <ProForm.Group title="選擇與切換">
          <ProFormRadio.Group
            name="gender"
            label="性別"
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' }
            ]}
          />
          <ProFormSelect
            name="role"
            label="角色"
            options={[
              { label: '管理員', value: 'admin' },
              { label: '使用者', value: 'user' }
            ]}
          />
          <ProFormSwitch name="isActive" label="啟用" />
          <ProFormTreeSelect
            name="department"
            label="部門"
            request={async () => [
              {
                title: '研發部',
                value: 'dev',
                children: [{ title: '前端', value: 'frontend' }]
              },
              {
                title: '行銷部',
                value: 'marketing'
              }
            ]}
          />
        </ProForm.Group>

        <ProForm.Group title="上傳與輸入">
          <ProFormUploadButton
            name="profile"
            title='上傳圖片'
            label="上傳圖片"
            max={1}
            fieldProps={{
              name: 'file',
              listType: 'picture-card'
            }}
            action="/upload.do"
          />
          <ProFormUploadButton
            name="attachments"
            title='上傳檔案'
            label="上傳檔案"
            fieldProps={{
              name: 'file',
              listType: 'text'
            }}
            action="/upload.do"
          />
        </ProForm.Group>

        {/* 若有自訂 FormRichTextEditor，可替換下方為對應元件 */}
        <ProFormTextArea name="richText" label="內容（可當作 RichTextEditor 示例）" placeholder="輸入 HTML 或富文字..." />

      </ProForm>
    </PageContainer>
  )
}

export default FormOriginal