import { PluginFunc } from 'dayjs'

/**
 * 明治紀元的年份偏差
 */
export const yearBias = 1911

/**
 * Dayjs 的民國紀元插件
 * 
 * @param o - Dayjs 的配置物件。
 * @param c - Dayjs 的類別。
 */
const minguoEra: PluginFunc = (o, c) => {
  const { prototype } = c
  const oldFormat = prototype.format

  /**
   * 覆寫 Dayjs 的 format 方法，以支援民國紀元格式化
   * 
   * @param formatStr - 格式化字串。
   * @returns 格式化後的字串。
   */
  prototype.format = function (formatStr: string) {
    const str = formatStr
    const result = str.replace(/(\[[^\]]+])|TTT/g, (match: any, a: any) => {
      // @ts-ignore
      const year = String(this.$y - yearBias)
      const args = [year, 4]
      // @ts-ignore
      return a || this.$utils().s(...args, '')
    })
    return oldFormat.bind(this)(result)
  }
}

export default minguoEra