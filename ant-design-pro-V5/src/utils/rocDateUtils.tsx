import dayjs, { Dayjs } from 'dayjs'

/**
 * 將民國日期字串 轉換為 dayjs 物件
 * @param input 民國 年月日 字串
 * @returns Dayjs | null
 */
export const parseRocDate = (input: string): Dayjs | null => {
  // 只留下數字
  let value = input.replace(/\D/g, "")
  // 規則轉換
  if (value.length < 6) return null
  if (value.length > 7) return null
  if (value.length === 6) value = "0" + value

  const dateStr = value.slice(0, 3) + "/" + value.slice(3, 5) + "/" + value.slice(5, 7)
  const date = dayjs(dateStr, "TTT/MM/DD")
  return date.isValid() ? date : null
};

/**
 * 將民國日期字串 轉換為 dayjs 物件
 * @param input 民國 年月 字串
 * @returns Dayjs | null
 */
export const parseRocDateMonth = (input: string): Dayjs | null => {
  // 只留下數字
  let value = input.replace(/\D/g, "")
  // 規則轉換
  if (value.length < 4) return null
  if (value.length > 5) return null
  if (value.length === 4) value = "0" + value

  const dateStr = value.slice(0, 3) + "/" + value.slice(3, 5)
  const date = dayjs(dateStr, "TTT/MM")
  return date.isValid() ? date : null
}
