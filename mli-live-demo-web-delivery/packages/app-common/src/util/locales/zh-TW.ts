import common from './zh-TW/common'
import component from './zh-TW/component'
import microApp from './zh-TW/microApp'

import zhTW from 'antd/es/locale/zh_TW.js'
import { merge } from 'lodash'

merge(zhTW.DatePicker?.lang, {
  yearFormat: 'TTT年',
  cellYearFormat: 'TTT年',
  fieldDateFormat: 'TTT/MM/DD',
  fieldDateTimeFormat: 'TTT/MM/DD HH:mm:ss',
  dateFormat: 'TTT年M月D日',
  dateTimeFormat: 'TTT年M月D日 HH時mm分ss秒'
})

merge(zhTW.Upload, {
  downloadFile: '下載文件'
})

export const commonLocales = {
  'navBar.lang': '語言',
  'pagination.total.item': '資料筆數：',
  'layout.header.title': 'mli-live-demo-web',
  ...component,
  ...common,
  ...microApp
}

export default commonLocales
