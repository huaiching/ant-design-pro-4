import { parseRocDate, parseRocDateMonth } from '@/utils/rocDateUtils'
import ProForm, {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormList
} from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import { Button, DatePicker, List, message } from 'antd'
import { log } from 'console'
import dayjs, { Dayjs } from 'dayjs'
import { debounce } from 'lodash'
import React, { useEffect, useRef } from 'react'

// 模擬數據
let data = {
  chkDate: '112/05/01',
  chkDateYYMM: '112/05',
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
      chkDate: parseRocDate(data?.chkDate) as Dayjs,
      chkDateYYMM: parseRocDateMonth(data?.chkDateYYMM) as Dayjs,
      chkDateRange: [
        parseRocDate(data.chkDateRange[0]) as Dayjs,
        parseRocDate(data.chkDateRange[1]) as Dayjs
      ],
      chkDateMulti: (data.chkDateMulti as string[]).map((item) => parseRocDate(item) as Dayjs),
      dateList: data.dateList.map((item) => ({
        dateRange: [parseRocDate(item.start) as Dayjs, parseRocDate(item.end) as Dayjs]
      }))
    })
  }, [])

  // 表單值變更處理，使用 debounce 限制觸發頻率
  const handleValueChange = debounce(() => {
    // 取得表單變更資料
    const values = formRef.current?.getFieldsValue()
    // 日期格式轉換
    const chkDate = dayjs(values.chkDate).isValid() ? dayjs(values.chkDate).format('TTT/MM/DD') : ''
    const chkDateYYMM = dayjs(values.chkDateYYMM).isValid() ? dayjs(values.chkDateYYMM).format('TTT/MM') : ''
    const chkDateRange = () => {
      const chkDateRange = values?.chkDateRange || ['', '']
      return [
        dayjs(chkDateRange[0] || '').isValid() ? dayjs(chkDateRange[0] || '').format('TTT/MM/DD') : '',
        dayjs(chkDateRange[1] || '').isValid() ? dayjs(chkDateRange[1] || '').format('TTT/MM/DD') : ''
      ]
    }
    const chkDateMulti = values?.chkDateMulti
      ? (values.chkDateMulti as Dayjs[]).map((item) => dayjs(item).format('TTT/MM/DD'))
      : []
    const dateList = values?.dateList
      ? (values.dateList as any[]).map((item) => {
          const dateRange = item?.dateRange || ['', '']
          return {
            start: dayjs(dateRange[0] || '').isValid() ? dayjs(dateRange[0]).format('TTT/MM/DD') : '',
            end: dayjs(dateRange[1] || '').isValid() ? dayjs(dateRange[1]).format('TTT/MM/DD') : ''
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
    <>
      <h1>ProFormDatePicker</h1>
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
              onBlur: (e: any) => {
                if (e.target?.value) {
                  formRef.current?.setFieldValue('chkDate', parseRocDate(e.target?.value))
                  handleValueChange()
                }
              }
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
              onBlur: (e: any) => {
                if (e.target?.value) {
                  formRef.current?.setFieldValue('chkDateYYMM', parseRocDateMonth(e.target?.value))
                  handleValueChange()
                }
              }
            }}
          />
          <ProFormDateRangePicker
            name="chkDateRange"
            label="選擇日期區間"
            rules={[{ required: true, message: '日期為必填項' }]}
            fieldProps={{
              format: 'TTT/MM/DD',
              style: { width: '100%' },
              onBlur: (e: any) => {
                if (e.target?.value) {
                  const root = e.target?.closest('.ant-picker-range')
                  if (!root) return

                  // 抓兩個 input 的原始字串
                  const inputs = root.querySelectorAll('input')
                  const startRaw = inputs?.[0]?.value ?? ''
                  const endRaw = inputs?.[1]?.value ?? ''

                  // 日期格式化
                  const start = parseRocDate(startRaw)
                  const end = parseRocDate(endRaw)

                  // 回寫到表單
                  formRef.current?.setFieldValue('chkDateRange', [start, end])
                  handleValueChange()
                }
              }
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
                    onBlur: (e: any) => {
                      const target = e.target as HTMLInputElement
                      const root = target?.closest('.ant-picker-range')
                      if (!root) return

                      // 抓兩個 input 的原始字串
                      const inputs = root.querySelectorAll('input')
                      const startRaw = inputs?.[0]?.value?.trim() ?? ''
                      const endRaw = inputs?.[1]?.value?.trim() ?? ''

                      // 起日 或 契日 其中一個有值時，進行轉換
                      if (startRaw || endRaw) {
                        // 日期格式化
                        const start = parseRocDate(startRaw)
                        const end = parseRocDate(endRaw)

                        if (start || end) {
                          formRef.current?.setFieldValue(
                            ['dateList', index, 'dateRange'],
                            [start, end]
                          )
                          handleValueChange()
                        }
                      }
                    }
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
            "2. 前端日期資料 (string) 要轉換為 dayjs 物件時，請使用 dayjs(XXX, 'TTT/MM/DD') 進行格式轉換。",
            "3. 導出數據時，要使用 dayjs(XXX).format('TTT/MM/DD') 來將 日期 轉換為 string"
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </ProForm>
    </>
  )
}
export default MyForm
