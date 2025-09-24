// @ts-nocheck
import { PluginFunc } from 'dayjs'
import { yearBias } from './minguoEra'

const minguoEraParse: PluginFunc = (o, c) => {
  const { prototype } = c
  const oldParse = prototype.parse
  prototype.parse = function (cfg: any) {
    const matchString = 'TTT'
    const regex = new RegExp(`(\\[[^\\]]+])|${matchString}`, 'g')
    const { date, args } = cfg
    let transCfg = {
      ...cfg
    }

    if (date && typeof date === 'string' && args) {
      const format = args[1]

      let match
      let result = date

      if ((match = regex.exec(format)) !== null) {
        // 獲取 'TTT' 的起始位置
        const index = match.index
        const endIndex = match.index + matchString.length
        // 獲取目標字符串中對應位置的文字
        const charAtdate = date.substring(index, endIndex)
        let num = parseInt(charAtdate)
        if (!isNaN(num)) {
          num = num + yearBias
          // 將結果轉換回字符串
          const newChar = num.toString()
          // 替換原文字
          result = result.slice(0, index) + newChar + result.slice(endIndex)
        }
        const transFormat = format.replace(regex, 'YYYY')
        transCfg = {
          ...cfg,
          date: result,
          args: [result, transFormat]
        }
      }
    }
    return oldParse.bind(this)(transCfg)
  }
}

export default minguoEraParse
