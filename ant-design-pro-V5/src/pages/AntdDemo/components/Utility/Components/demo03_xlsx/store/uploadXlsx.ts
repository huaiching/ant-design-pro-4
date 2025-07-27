
/** uploadXlsx.ts
 * 【範例】透過 xlsx 解析 excel
 */
import * as xlsx from 'xlsx'

export const uploadXlsx = (files: File): Promise<any[]> => {
  // resolve = 正確回傳 ； reject = 錯誤回傳
  return new Promise((resolve, reject)=>{
    try {
      // 透過 FileReader 來讀取上傳的文件
      const fileReader = new FileReader()
      // 設定 讀取時要做什麼事情
      fileReader.onload = (event: any) => {
        // 將數據轉換成 UTF8 的陣列資料
        const utf8Data = new Uint8Array(event.target?.result)
        // 將陣列型態的數據資料，轉換成 EXCEL 的表格對象
        const workbook = xlsx.read(utf8Data, {
          type: 'array'
        })
        // 準備解析 EXCEL 表格對象的資料
        // 取得 EXCEL 工作表的名稱 (這裡取得第一個工作表 0~)
        const workName = workbook.SheetNames[0]
        // 讀取 EXCEL 工作表數據 (參數為 要讀取的工作表名稱)
        const workSheet = workbook.Sheets[workName]
        // 將 讀取的 EXCEL 數據 轉換為 JSON 格式資料
        const uploadData = xlsx.utils.sheet_to_json(workSheet, {
          header: ['clientId','names','age']
        })
        // 排除 標題資料
        const output = uploadData.filter((data: any)=> data.clientId != '客戶證號')
        resolve(output)
      }
      // 讀取上傳的文件
      fileReader.readAsArrayBuffer(files)
    } catch (error) {
      reject(error)
    }
  })
}
