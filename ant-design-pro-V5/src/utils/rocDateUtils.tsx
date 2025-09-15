import { message } from 'antd'
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
  const maxDay = dayjs(`${year}-${month}`, 'YYYY-M').daysInMonth()

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