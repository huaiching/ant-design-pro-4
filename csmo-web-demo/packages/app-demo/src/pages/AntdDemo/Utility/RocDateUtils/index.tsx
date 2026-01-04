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
    <PageContainer title={false}>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={false}
      >
        <Typography>
          <Title level={3}>dayjs 日期工具</Title>
          <Paragraph>
            此工具為 <code>dayjs</code> 的 相關工具，包含 <code>日期格式檢核</code> 與 <code>民國年日期字串 轉 Dayjs 的日期格式轉換</code>。
          </Paragraph>
          <Paragraph type='success'>
            <code>parseRocDate</code> 和 <code>parseRocDateMonth</code> 可提供 <code>6 碼 民國年 的 日期格式轉換</code>，如：<code>950101</code> 轉為 <code>095/01/01</code>。<br/>
            <code>rocStringToDayjs</code> 和 <code>rocStringToDayjsMonth</code> 可提供 <code>API 的 民國字串日期</code> 轉為 <code>Dayjs 格式</code> 使用。
          </Paragraph>
            <Table
              size="small"
              bordered
              columns={[
                { title: '方法', dataIndex: 'name', width: 300 },
                { title: '函式', dataIndex: 'method' }
              ]}
              dataSource={[
                { name: '檢查傳入的年月日是否為合法日期', method: 'isValidDate' },
                { name: '民國日期字串 轉 Dayjs (年月日) (含檢核)', method: 'parseRocDate' },
                { name: '民國日期字串 轉 Dayjs (年月) (含檢核)', method: 'parseRocDateMonth' },
                { name: '民國日期字串 轉 Dayjs (年月日) ', method: 'rocStringToDayjs' },
                { name: '民國日期字串 轉 Dayjs (年月) ', method: 'rocStringToDayjsMonth' },
              ]}
              pagination={false}
            />
          
          <details>
            <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>工具程式碼</summary>
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
}

/**
 * 日期字串 轉 Dayjs
 * @param input 日期字串 (年月日)
 * @returns 
 */
export const rocStringToDayjs = (input: string): Dayjs | null => {
  return dayjs(input, 'TTT/MM/DD').isValid() ? dayjs(input, 'TTT/MM/DD') : null
}

/**
 * 日期字串 轉 Dayjs
 * @param input 日期字串 (年月)
 * @returns 
 */
export const rocStringToDayjsMonth = (input: string): Dayjs | null => {
  return dayjs(input, 'TTT/MM').isValid() ? dayjs(input, 'TTT/MM') : null
}`} />

          </details>

          <hr />

          <Title level={3}>日期元件 手動輸入 免輸入 <code>/</code></Title>
          <Paragraph>
            先根據 下面程式碼，建立 <code>util</code> 工具，如：<code>src/utils/Dayjs/enhanceDatePicker.ts</code> <br/>
            再於 <code>App.tsx</code> 中 import 即可。
          </Paragraph>
          <Paragraph type='danger'>

          </Paragraph>
          <CodeTsx code={`import '@/utils/Dayjs/enhanceDatePicker'`} />
          <br/>
          <Paragraph type='danger'>
            此方式為 <code>全域設定</code>，會自動在所有 <code>日期元件</code> 中生效。<br/>
            使用後，會支援 <code>7 碼</code> 民國年的日期轉換。 <br/>
            如：<code>1150104</code> 自動轉為 <code>115/01/04</code> <br/>
            　　<code>0950104</code> 自動轉為 <code>095/01/04</code>。<br/>
            <br/>
            不支援 <code>6 碼</code> 的民國年日期轉換，如：不支援 <code>950104</code> 的日期格式轉換。<br/>
            如有此類需求，可參考 下方使用方式，透過 <code>onBlur</code> 來手動透過 <code>parseRocDate</code> 或 <code>parseRocDateMonth</code> 執行日期轉換。
          </Paragraph>
          <details>
            <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>工具程式碼</summary>
            <CodeTsx code={`import { message } from "antd"
import dayjs from "dayjs"

const YEAR_BIAS = 1911

export const minguoEraParse = (option: any, dayjsClass: any) => {
  const prototype = dayjsClass.prototype
  const oldParse = prototype.parse

  prototype.parse = function (cfg: any) {
    const { date, args } = cfg

    // 空輸入直接走原生（Antd 會視為 null）
    if (
      !date ||
      date === null ||
      date === undefined ||
      typeof date !== 'string' ||
      date.trim() === '' ||
      !args ||
      !args[1]
    ) {
      return oldParse.call(this, cfg)
    }

    const format = args[1].trim()

    // 只處理含 T 的民國格式
    if (!format.includes('T')) {
      return oldParse.call(this, cfg)
    }

    const input = date.trim()

    // ===== 關鍵：一律提取純數字進行判斷 =====
    const digitsOnly = input.replace(/\D/g, '')

    // 是否為年月格式（用於決定補日與輸出格式）
    const isMonthPicker = format.includes('TTT/MM') && !format.includes('DD')

    let targetDigits: string | null = null
    let isValidInput = false

    if (isMonthPicker) {
      // 年月選擇器：接受 5 位純數字（如 11412）或任何帶分隔符的輸入（只要數字正確）
      if (digitsOnly.length === 5) {
        targetDigits = digitsOnly + '01'  // 補日為 01 → 變成 7 位處理
        isValidInput = true
      }
    } else {
      // 一般日期選擇器：只接受 7 位純數字
      if (digitsOnly.length === 7) {
        targetDigits = digitsOnly
        isValidInput = true
      }
    }

    // ===== 如果提取到正確長度的純數字，才進行解析 =====
    if (isValidInput && targetDigits) {
      const minguoYearStr = targetDigits.slice(0, 3)
      const monthStr = targetDigits.slice(3, 5)
      const dayStr = targetDigits.slice(5, 7)

      const fullMinguoStr = minguoYearStr + monthStr + dayStr

      if (isValidDate(fullMinguoStr)) {
        const gregorianYear = parseInt(minguoYearStr, 10) + YEAR_BIAS

        let gregorianDateStr: string
        let newFormat: string

        if (isMonthPicker) {
          gregorianDateStr = \`\${gregorianYear}/\${monthStr}/01\`
          newFormat = 'YYYY/MM'
        } else {
          gregorianDateStr = \`\${gregorianYear}/\${monthStr}/\${dayStr}\`
          newFormat = 'YYYY/MM/DD'
        }

        return oldParse.call(this, {
          ...cfg,
          date: gregorianDateStr,
          args: [gregorianDateStr, newFormat],
        })
      } else {
        // ===== 日期無效：顯示錯誤 + 強制回傳 invalid → onChange 收到 null =====
        message.error(
          isMonthPicker
            ? '月份格式錯誤，請檢查民國年月'
            : '日期格式錯誤，請檢查年月日是否正確'
        )
        this.$d = new Date(NaN)
        this.$invalid = true
        return this
      }
    }

    // 其他所有情況，一律不干涉
    return oldParse.call(this, cfg)
  }
}

/**
 * 檢查傳入的年月日是否為合法日期
 * @param date 日期字串
 * @returns boolean 是否為有效日期
 */
export const isValidDate = (date: string): boolean => {
  if (date.length !== 7) return false

  const year = parseInt(date.slice(0, 3), 10) + YEAR_BIAS
  const month = parseInt(date.slice(3, 5), 10)
  const day = parseInt(date.slice(5, 7), 10)

  if (month < 1 || month > 12 || day < 1 || day > 31) return false

  return day <= dayjs(\`\${year}-\${month}\`, 'YYYY-M').daysInMonth()
}

dayjs.extend(minguoEraParse)`} />

          </details>

          <hr />

          <Title level={3}>使用方式</Title>
          <Paragraph>
            若有使用 <code>日期元件 手動輸入 免輸入 /</code>，當 日期格式為 <code>TTT/MM/DD</code> 或 <code>TTT/MM</code>，即可 自動將 <code>7 碼 民國年</code> 自動轉換為 <code>dayjs 日期</code>，日期元件無須特殊設定。
          </Paragraph>
          <Paragraph>
            若無使用 或是 有 <code>6 碼</code> 民國年日期輸入需求，則 需要在 日期元件 的 <code>onBlur</code> 事件中，呼叫 <code>parseRocDate</code> 或 <code>parseRocDateMonth</code> 方法，將使用者輸入的民國日期字串 轉換為 dayjs 物件，並透過 <code>formRef.current?.setFieldValue()</code> 來更新表單欄位的值。
          </Paragraph>
          <Paragraph type='danger'>
            由於是透過 <code>formRef.current?.setFieldValue()</code> 直接更新表單數值。 <br />
            因此不會觸發 <code>onValuesChange</code> 事件，需要 另外呼叫對應的函式 進行資料同步作業。
          </Paragraph>
          <Paragraph>
            下面為 <code>onBlur</code> 的 使用範例：
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