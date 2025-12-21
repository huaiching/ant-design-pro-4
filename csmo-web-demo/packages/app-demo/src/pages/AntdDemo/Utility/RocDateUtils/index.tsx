import CodeTsx from "@/utils/CodePre/CodeTsx";
import { parseRocDate, parseRocDateMonth } from "@/utils/rocDateUtils";
import { PageContainer, ProForm, ProFormDatePicker, ProFormDateRangePicker, ProFormInstance } from "@ant-design/pro-components"
import { MliFormRow } from "@mli-csmo/base";
import { Table, Typography } from "antd";
import { useRef } from "react";

const DateUtile: React.FC = () => {
  const { Title, Paragraph } = Typography
  const formRef = useRef<ProFormInstance>()


  return (
    <PageContainer>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={false}
      >
        <Typography>
          <Paragraph>
            透過 此工具 為 <code>Antd 日期套件</code> 的 擴展工具，透過此工具 可以讓 <code>Antd 日期套件</code> 支援 <code>民國年手動輸入</code> 達成 <code>1141201</code> 轉換為 <code>114/12/01</code>。
          </Paragraph>

          <hr />

          <details>
            <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>工具程式碼</summary>
            <Table
              size="small"
              bordered
              columns={[
                { title: '方法', dataIndex: 'name', width: 300 },
                { title: '函式', dataIndex: 'method' }
              ]}
              dataSource={[
                { name: '將民國日期字串 轉換為 dayjs 物件 (年月日)', method: 'parseRocDate' },
                { name: '將民國日期字串 轉換為 dayjs 物件 (年月)', method: 'parseRocDateMonth' },
                { name: '檢查傳入的年月日是否為合法日期', method: 'isValidDate' },
              ]}
              pagination={false}
            />
            <CodeTsx code={`import { message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

/**
 * 檢查傳入的年月日是否為合法日期
 * @param date 日期字串
 * @returns boolean 是否為有效日期
 */
export const isValidDate = (date: string): boolean => {
  // 只留下數字
  const value = date.replace(/\D/g, '')

  // 拆解 年月日
  let year = 0
  let month = 0
  let day = 0
  if (value.length === 8) {
    // 西元年
    year  = parseInt(value.slice(0, 4), 10)
    month = parseInt(value.slice(4, 6), 10)
    day   = parseInt(value.slice(6, 8), 10)
  } else if (value.length === 7) {
    // 民國年
    year  = parseInt(value.slice(0, 3), 10) + 1911
    month =  parseInt(value.slice(3, 5), 10)
    day   = parseInt(value.slice(5, 7), 10)
  } else {
    return false
  }

  // 月份範圍檢查
  if (month < 1 || month > 12) return false

  // 日期範圍初步檢查
  if (day < 1 || day > 31) return false

  // 取得該月最大天數
  const maxDay = dayjs(\`\${year}-\${month}\`, 'YYYY-M').daysInMonth()

  // 比對 day 是否在該月的天數範圍內
  return day <= maxDay
}


/**
 * 將民國日期字串 轉換為 dayjs 物件
 * @param input 民國 年月日 字串
 * @returns Dayjs | null
 */
export const parseRocDate = (input: string): Dayjs | null => {
  // 有資料才處理
  if (!input) {
    return null
  }
  // 只留下數字
  let value = input.replace(/\D/g, '')

  // 西元年 轉 民國年
  if (value.length === 8) {
    const year = parseInt(value.slice(0, 4), 10) - 1911
    value = year.toString() + value.slice(4, 8)
  }

  // 規則轉換
  if (value.length === 6) {
    value = '0' + value
  } else if (value.length !== 7) {
    message.error('日期格式錯誤')
    return null
  }

  // 日期格式檢查
  if (!isValidDate(value)) {
    message.error('日期格式錯誤')
    return null
  }

  const dateStr = value.slice(0, 3) + '/' + value.slice(3, 5) + '/' + value.slice(5, 7)
  const date = dayjs(dateStr, 'TTT/MM/DD')
  return date.isValid() ? date : null
}


/**
 * 將民國日期字串 轉換為 dayjs 物件
 * @param input 民國 年月 字串
 * @returns Dayjs | null
 */
export const parseRocDateMonth = (input: string): Dayjs | null => {
  // 有資料才處理
  if (!input) {
    return null
  }
  // 只留下數字
  let value = input.replace(/\D/g, '')

  // 西元年 轉 民國年
  if (value.length === 6) {
    const year = parseInt(value.slice(0, 4), 10) - 1911
    value = year.toString() + value.slice(4, 6)
  }

  // 規則轉換
  if (value.length === 4) {
    value = '0' + value
  } else if (value.length !== 5) {
    message.error('日期格式錯誤')
    return null
  }

  // 日期格式檢查
  const month =  parseInt(value.slice(3, 5), 10)
  if (month < 1 || month > 12) {
    message.error('日期格式錯誤')
    return null
  }

  const dateStr = value.slice(0, 3) + '/' + value.slice(3, 5)
  const date = dayjs(dateStr, 'TTT/MM')
  return date.isValid() ? date : null
}`} />

          </details>

          <hr />

          <Title level={3}>使用方式</Title>
          <Paragraph>
            使用時，需要在 日期元件 的 <code>onBlur</code> 事件中，呼叫 <code>parseRocDate</code> 或 <code>parseRocDateMonth</code> 方法，將使用者輸入的民國日期字串 轉換為 dayjs 物件，並透過 <code>formRef.current?.setFieldValue()</code> 來更新表單欄位的值。
          </Paragraph>
          <Paragraph type='danger'>
            由於是透過 <code>formRef.current?.setFieldValue()</code> 直接更新表單數值。 <br />
            因此不會觸發 <code>onValuesChange</code> 事件，需要 另外呼叫對應的函式 進行資料同步作業。
          </Paragraph>

          <hr />

          <br/>
          <MliFormRow>
            <ProFormDatePicker
              name="date"
              label="ProFormDatePicker"
              placeholder="可手動輸入日期"
              fieldProps={{
                format: 'TTT/MM/DD',
                style: { width: '100%' },
                onBlur: (e: any) => {
                  if (e.target?.value) {
                    formRef.current?.setFieldValue('date', parseRocDate(e.target?.value))
                  }
                }
              }}
            />
          </MliFormRow>
          <CodeTsx code={`<ProFormDatePicker
  name="date"
  label="ProFormDatePicker"
  placeholder=""
  fieldProps={{
    format: 'TTT/MM/DD',
    onBlur: (e: any) => {
      if (e.target?.value) {
        formRef.current?.setFieldValue('date', parseRocDate(e.target?.value))
        handleValueChange()
      }
    }
  }}
/>`} />

          <hr />

          <br/>
          <MliFormRow>
            <ProFormDatePicker.Month
              name="dateMonth"
              label="ProFormDatePicker.Month"
              placeholder="可手動輸入日期"
              fieldProps={{
                format: 'TTT/MM',
                style: { width: '100%' },
                onBlur: (e: any) => {
                  if (e.target?.value) {
                    formRef.current?.setFieldValue('dateMonth', parseRocDateMonth(e.target?.value))
                  }
                }
              }}
            />
          </MliFormRow>
          <CodeTsx code={`<ProFormDatePicker.Month
  name="dateMonth"
  label="ProFormDatePicker.Month"
  placeholder=""
  fieldProps={{
    format: 'TTT/MM',
    style: { width: '100%' },
    onBlur: (e: any) => {
      if (e.target?.value) {
        formRef.current?.setFieldValue('dateMonth', parseRocDateMonth(e.target?.value))
        handleValueChange()
      }
    }
  }}
/>`} />

          <hr />

          <br/>
          <MliFormRow>
            <ProFormDateRangePicker
              name="dateRange"
              label="ProFormDateRangePicker"
              placeholder="可手動輸入日期"
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
                    formRef.current?.setFieldValue('dateRange', [start, end])
                  }
                }
              }}
            />
          </MliFormRow>
          <CodeTsx code={`<ProFormDateRangePicker
  name="dateRange"
  label="ProFormDateRangePicker"
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
        formRef.current?.setFieldValue('dateRange', [start, end])
        handleValueChange()
      }
    }
  }}
/>`} />

          <hr />

          <br/>
          <Paragraph>
            <code>ProTable</code> 的 <code>search</code> 中，<code>valueType: 'date'</code> 欄位，亦可使用此工具進行 民國年手動輸入 轉換。
          </Paragraph>
          <CodeTsx code={`{
  title: '生日',
  dataIndex: 'birthDate',
  valueType: 'date',
  fieldProps: {
    format: 'TTT/MM/DD',
    onBlur: (e: any) => {
      if (e.target?.value) {
        formRef.current?.setFieldValue('birthDate', parseRocDate(e.target.value))
      }
    }
  }
}`} />

          <hr />

          <br/>
          <Paragraph>
            <code>EditableProTable</code> 的 <code>valueType: 'date'</code> 欄位，亦可使用此工具進行 民國年手動輸入 轉換。
          </Paragraph>
          <CodeTsx code={`{
  title: '生日',
  dataIndex: 'birthDate',
  valueType: 'date',
  fieldProps: (form, row) => ({
    format: 'TTT/MM/DD',
    onBlur: (e: any) => {
      // 取得 欄位資料
      const value = e.target?.value
      // 取得 該行 index
      let rowKey = row?.rowKey ? row.rowKey[1] : row?.rowKey
      // 取得 table 資料
      const tableData = formRef.current?.getFieldValue('editTable') || []
      // 更新該行資料 並進行 日期格式化
      const newData = tableData.map((item: any, index: number) =>
        index === Number(rowKey) ? { ...item, birthDate: parseRocDate(value) } : item
      )
      // 資料更新
      formRef.current?.setFieldValue('editTable', newData )
    }
  })
}`} />

        </Typography>
      </ProForm>
    </PageContainer>
  )
}
export default DateUtile;