import dayjs, { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'

// 修改 AntD 使用的 dayjs generateConfig
const originalGetYear = dayjsGenerateConfig.getYear
const originalSetYear = dayjsGenerateConfig.setYear

dayjsGenerateConfig.getYear = (date: Dayjs) => {
  return originalGetYear(date) - 1911
}

dayjsGenerateConfig.setYear = (date: Dayjs, year: number) => {
  return originalSetYear(date, year + 1911)
}
