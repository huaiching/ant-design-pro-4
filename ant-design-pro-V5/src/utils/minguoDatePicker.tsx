// src/components/MliDatePicker.tsx
import React from 'react'
import { DatePicker } from 'antd'
import { DatePickerProps } from 'antd/lib/date-picker'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import minguoEra from '@mli-csmo/base/utils/dayjs/minguoEra'
import minguoEraParse from '@mli-csmo/base/utils/dayjs/minguoEraParse'

dayjs.locale('zh-tw')
dayjs.extend(customParseFormat)
dayjs.extend(minguoEra)
dayjs.extend(minguoEraParse)

// ✅ 這段是關鍵：覆寫 AntD 使用的 dayjs 年顯示邏輯
const overrideYearDisplay = () => {
  const originalFormat = dayjs.prototype.format
  dayjs.prototype.format = function (formatStr: string) {
    if (formatStr.includes('YYYY')) {
      // 替換民國年（例：2025 -> 114）
      const replaced = formatStr.replace('YYYY', String(this.year() - 1911).padStart(3, '0'))
      return originalFormat.call(this, replaced)
    }
    return originalFormat.call(this, formatStr)
  }
}
overrideYearDisplay()

const MliDatePicker: React.FC<DatePickerProps> = (props) => {
  return <DatePicker {...props} />
}

export default MliDatePicker
