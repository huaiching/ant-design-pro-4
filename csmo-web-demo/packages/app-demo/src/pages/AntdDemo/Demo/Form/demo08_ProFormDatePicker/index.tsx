import { dayjsToRocString, dayjsToRocStringMonth, rocStringToDayjs, rocStringToDayjsMonth } from '@/utils/Dayjs/rocDateUtils'
import ProForm, {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormList
} from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import { Button, DatePicker, List, message } from 'antd'
import { log } from 'console'
import { Dayjs } from 'dayjs'
import { debounce } from 'lodash'
import React, { useEffect, useRef } from 'react'

// 模擬數據
let data = {
  chkDate: '',
  chkDateYYMM: '114/12',
  chkDateRange: ['112/05/01', '112/05/15'],
  chkDateMulti: ['112/05/01', '112/05/03', '112/05/05'],
  dateList: [
    { start: '112/05/01', end: '112/05/10' },
    { start: '112/06/01', end: '112/06/10' }
  ]
}

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  useEffect(() => {
    // 預設帶入表單資料
    formRef.current?.setFieldsValue({
      ...data,
      // 日期欄位 轉 dayjs 格式
      chkDate: rocStringToDayjs(data?.chkDate),
      chkDateYYMM: rocStringToDayjsMonth(data?.chkDateYYMM),
      chkDateRange: [
        rocStringToDayjs(data.chkDateRange[0]),
        rocStringToDayjs(data.chkDateRange[1])
      ],
      chkDateMulti: (data.chkDateMulti as string[]).map((item) => rocStringToDayjs(item)),
      dateList: data.dateList.map((item) => ({
        dateRange: [rocStringToDayjs(item.start), rocStringToDayjs(item.end)]
      }))
    })
  }, [])

  // 表單值變更處理，使用 debounce 限制觸發頻率
  const handleValueChange = debounce(() => {
    // 取得表單變更資料
    const values = formRef.current?.getFieldsValue()
    // 日期格式轉換
    const chkDate = dayjsToRocString(values.chkDate)
    const chkDateYYMM = dayjsToRocStringMonth(values.chkDateYYMM)
    const chkDateRange = () => {
      const chkDateRange = values?.chkDateRange || ['', '']
      return [
        dayjsToRocString(chkDateRange[0]), dayjsToRocString(chkDateRange[1])
      ]
    }
    const chkDateMulti = values?.chkDateMulti
      ? (values.chkDateMulti as Dayjs[]).map((item) => dayjsToRocString(item))
      : []
    const dateList = values?.dateList
      ? (values.dateList as any[]).map((item) => {
          const dateRange = item?.dateRange || ['', '']
          return {
            start: dayjsToRocString(dateRange[0]),
            end: dayjsToRocString(dateRange[1])
          }
        })
      : []

    data = {
      ...data,
      chkDate: chkDate,
      chkDateYYMM: chkDateYYMM,
      chkDateRange: chkDateRange(),
      chkDateMulti: chkDateMulti,
      dateList: dateList
    }
  }, 300)

  // 控制送出後之動作
  const submitterRender = () => {
    return {
      render: () => (
        <FooterToolbar>
          <Button
            type="primary"
            onClick={async () => {
              log('表單數據', data)
              formRef.current?.validateFields().then(() => {
                message.success('表單提交成功！')
              })
            }}
            key="save"
          >
            確認
          </Button>
          <Button
            onClick={async () => {
              // 取消按鈕 點擊後 要進行的 API 操作
              message.warning('取消作業')
            }}
          >
            取消
          </Button>
        </FooterToolbar>
      )
    }
  }

  return (
    <PageContainer>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={submitterRender()}
        onValuesChange={handleValueChange}
      >
        <MliFormRow>
          <ProFormDatePicker
            name="chkDate"
            label="選擇日期"
            placeholder="請選擇日期"
            rules={[{ required: true, message: '日期為必填項' }]}
            fieldProps={{
              format: 'TTT/MM/DD',
              style: { width: '100%' },
              inputReadOnly: false,
            }}
          />
          <ProFormDatePicker.Month
            name="chkDateYYMM"
            label="選擇月份"
            placeholder="請選擇月份"
            rules={[{ required: true, message: '日期為必填項' }]}
            fieldProps={{
              format: 'TTT/MM',
              style: { width: '100%' },
            }}
          />
          <ProFormDateRangePicker
            name="chkDateRange"
            label="選擇日期區間"
            rules={[{ required: true, message: '日期為必填項' }]}
            fieldProps={{
              format: 'TTT/MM/DD',
              style: { width: '100%' },
            }}
          />
          {/* 多選日期 */}
          <MliFormCol colSize={1}>
            <ProForm.Item
              name="chkDateMulti"
              label="多選日期 (僅能使用滑鼠點選)"
              rules={[{ required: true, message: '請至少選擇一個日期' }]}
            >
              <DatePicker
                multiple
                format="TTT/MM/DD"
                placeholder="請選擇多個日期"
                maxTagCount="responsive"
              />
            </ProForm.Item>
          </MliFormCol>

          <MliFormCol colSize={2}>
            <ProFormList
              name="dateList"
              label="選擇日期區間"
              copyIconProps={false} // 禁用「複製此行」按鈕
              // deleteIconProps={false} // 禁用默認的「刪除此行」按鈕
              alwaysShowItemLabel // 總是顯示項目標籤
            >
              {/* field : 數值資料 */}
              {/* index : 索引值，從 0 開始 */}
              {/* action: 操作方法，add=新增 / remove=刪除 */}
              {/* count : 總筆數 */}
              {(field, index, action, count) => (
                <ProFormDateRangePicker
                  name="dateRange"
                  rules={[{ required: true, message: '日期為必填項' }]}
                  fieldProps={{
                    format: 'TTT/MM/DD',
                    style: { width: '100%' },
                  }}
                />
              )}
            </ProFormList>
          </MliFormCol>
        </MliFormRow>
        <List
          size="small"
          dataSource={[
            "1. Date: 日期格式 fieldProps.format 設定為 'TTT/MM/DD' (民國年)。",
            "2. 前端資料 日期為 字串(string) 時，需轉換為 Dayjs 格式才可使用，請使用：",
            "　dayjs(stringDate, 'TTT/MM/DD').isValid() ? dayjs(stringDate, 'TTT/MM/DD') : null",
            "　dayjs(stringDate, 'TTT/MM').isValid() ? dayjs(stringDate, 'TTT/MM') : null",
            "　或是 小工具 中的 rocStringToDayjs(stringDate) 與 rocStringToDayjsMonth(stringDate)",
            "3. 導出數據時，要使用 dayjs(XXX).format('TTT/MM/DD') 來將 日期 轉換為 string",
            "　或是 小工具 中的 dayjsToRocString(dayjsDate) 與 dayjsToRocStringMonth(dayjsDate)"
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </ProForm>
    </PageContainer>
  )
}
export default MyForm
