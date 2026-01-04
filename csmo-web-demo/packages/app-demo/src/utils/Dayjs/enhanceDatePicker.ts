import { message } from "antd"
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

  return day <= dayjs(`${year}-${month}`, 'YYYY-M').daysInMonth()
}

dayjs.extend(minguoEraParse)