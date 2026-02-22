import dayjs from "dayjs"

const YEAR_BIAS = 1911

/**
 * 顯示插件：增加 民國年顯示 (TTT/MM/DD、TTT/MM)
 * @param option 
 * @param dayjsClass 
 */
export const minguoFormat = (option: any, dayjsClass: any) => {
  const prototype = dayjsClass.prototype
  const oldFormat = prototype.format  // 保存原始 format 方法

  // 覆寫 Day.js 的 format 方法
  prototype.format = function (formatStr: string) {
    // 將 format 中的 TTT 替換為實際民國年（三位補零）
    const result = formatStr.replace(/(\[[^\]]+\])|TTT/g, (match: string, bracket: string) => {
      if (bracket) return bracket  // 保留 [文字] 不變
      const minguoYear = this.$y - 1911  // this.$y 是 Day.js 內部儲存的西元年
      return String(minguoYear).padStart(3, '0')  // 補零至三位：114、015、005
    })
    // 其餘格式交給原始 format 處理
    return oldFormat.call(this, result)
  }
}

dayjs.extend(minguoFormat)