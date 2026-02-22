import dayjs from "dayjs"

const YEAR_BIAS = 1911

/**
 * 解析插件：負責將使用者輸入的民國年轉換為 Day.js 可理解的西元年格式
 */
export const minguoParse = (option: any, dayjsClass: any) => {
  const prototype = dayjsClass.prototype
  const oldParse = prototype.parse

  prototype.parse = function (cfg: any) {
    const { date, args } = cfg

    // 空輸入，不處理
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

    // 提取純數字進行判斷
    let digitsOnly = input.replace(/\D/g, '')

    // 輸入西元年 轉換為 民國年
    if (format === 'TTT/MM/DD' && digitsOnly.length === 8) {
      const year = parseInt(digitsOnly.slice(0, 4), 10) - 1911
      const month = parseInt(digitsOnly.slice(4, 6), 10)
      const day = parseInt(digitsOnly.slice(6, 8), 10)
      digitsOnly = String(year).padStart(3, '0') + String(month).padStart(2, '0') + String(day).padStart(2, '0')
    }
    if (format === 'TTT/MM' && digitsOnly.length === 6) {
      const year = parseInt(digitsOnly.slice(0, 4), 10) - 1911
      const month = parseInt(digitsOnly.slice(4, 6), 10)
      digitsOnly = String(year).padStart(3, '0') + String(month).padStart(2, '0')
    }

    // 是否為年月格式（用於決定補日與輸出格式）
    const isMonthPicker = format.includes('TTT/MM') && !format.includes('DD')

    let targetDigits: string | null = null
    let isValidInput = false

    if (isMonthPicker) {
      // 年月選擇器：接受 5 位純數字（如 11412）
      if (digitsOnly.length === 5) {
        targetDigits = digitsOnly + '01'  // 補日為 01 → 變成 7 位處理
        isValidInput = true
      }
    } else {
      // 一般日期選擇器：接受 7 位純數字（如 1141231）
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
          gregorianDateStr = `${gregorianYear}/${monthStr}/01`
          newFormat = 'YYYY/MM'
        } else {
          gregorianDateStr = `${gregorianYear}/${monthStr}/${dayStr}`
          newFormat = 'YYYY/MM/DD'
        }

        return oldParse.call(this, {
          ...cfg,
          date: gregorianDateStr,
          args: [gregorianDateStr, newFormat],
        })
      } else {
        // ===== 日期無效：回傳 空白日期 =====
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

  return day <= dayjs(`${year}-${month}`, 'YYYY-M').daysInMonth()
}

dayjs.extend(minguoParse)