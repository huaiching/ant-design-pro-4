/** downloadXlsx.ts
 * 【範例】透過 xlsx 產生 excel
 */

import * as xlsx from 'xlsx'
// title資料
const title = ['clientId','names','age']
// title 中文名稱，當作第一筆資料寫入
const titleData = [
  {
    clientId: '客戶證號',
    names: '姓名',
    age: '年齡',
  }
]

export const downloadXlsx = () => {
  // 內容資料
  const data = [...titleData]
  // 設定資料
  const worksheet = xlsx.utils.json_to_sheet(data, {
    header: title,      // 設定 title
    skipHeader: true,   // 是否不顯示title: true=不顯示 / false:顯示 (預設)
  })
  // excel 物件宣告
  const workbook = xlsx.utils.book_new()
  // 設定 分頁 並 載入 資料內容
  xlsx.utils.book_append_sheet(workbook, worksheet, '空白範例')
  // 產出文件
  xlsx.writeFile(workbook, 'xlsx_example.xlsx')
}
