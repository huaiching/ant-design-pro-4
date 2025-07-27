import { message } from 'antd'


/**
 * 新增/修改/刪除資料 (Post/Get/Delete請求)
 * @param method 請求方法 ('GET', 'POST', 'DELETE')
 * @param fetchUrl API URL 
 * @param body 請求參數 (JSON格式)，對於 GET 和 DELETE 請求可傳入 `null` 或空物件，若無參數可不傳
 */
export const callActionApi = (method: 'GET' | 'POST' | 'DELETE', fetchUrl: string, body?: any) => {
  // 構建請求的選項
  const options: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // 如果有 body 且是 POST 或 DELETE 請求，才設置 body
  if ((method === 'POST' || method === 'DELETE') && body !== undefined && body !== null) {
    options.body = JSON.stringify(body)
  }

  fetch(fetchUrl, options)
    .then(response => {
        if (response.status === 200) {
            message.success('存檔成功')
        } else {
            message.error('存檔失敗')
        }
    }) 
    .catch((error) => {
      // Handle error here.
      console.error('下載檔案時發生錯誤:', error)
      message.error('下載檔案時發生錯誤:', error)
    })
}

/**
 * 查詢資料 (Post/Get/Delete請求)
 * @param method 請求方法 ('GET', 'POST', 'DELETE')
 * @param fetchUrl API URL 
 * @param body 請求參數 (JSON格式)，對於 GET 和 DELETE 請求可傳入 `null` 或空物件，若無參數可不傳
 * @returns Promise<any> - 成功回傳 data，失敗拋出錯誤
 */
export const callDataApi = (
  method: 'GET' | 'POST' | 'DELETE',
  fetchUrl: string,
  body?: any
): Promise<any> => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if ((method === 'POST' || method === 'DELETE') && body !== undefined && body !== null) {
    options.body = JSON.stringify(body)
  }

  return fetch(fetchUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API 請求失敗，狀態碼: ${response.status}`)
      }
      return response.json() // 假設回傳為 JSON
    })
    .then((data) => {
      message.success('資料獲取成功')
      return data
    })
    .catch((error) => {
      console.error('API 錯誤:', error)
      message.error('資料獲取失敗: ' + error.message)
      throw error // 讓呼叫方能繼續接 catch()
    })
}

/**
 * 下載檔案 (Post/Get/Delete請求)
 * @param method 請求方法 ('GET', 'POST', 'DELETE')
 * @param fetchUrl API URL 
 * @param fileType 檔案類型 (ex: 'xlsx', 'docx', 'pdf', 'txt', 'zip')
 * @param body 請求參數 (JSON格式)，對於 GET 和 DELETE 請求可傳入 `null` 或空物件，若無參數可不傳
 */
export const callDownloadApi = (method: 'GET' | 'POST' | 'DELETE', fetchUrl: string, fileType: string, body?: any) => {
  // 構建請求的選項
  const options: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // 如果有 body 且是 POST 或 DELETE 請求，才設置 body
  if ((method === 'POST' || method === 'DELETE') && body !== undefined && body !== null) {
    options.body = JSON.stringify(body)
  }

  fetch(fetchUrl, options)
    .then((response) => {
      // 從 header 中獲取 Content-Disposition
      const disposition = response.headers.get('Content-Disposition')
      let filename = 'download.' + fileType // 預設檔名
      // 如果有 Content-Disposition，嘗試解析檔名
      if (disposition && disposition.includes('attachment')) {
        const filenameMatch = disposition.match(/filename[^=\n]*=((['']).*?\2|[^\n]*)/)
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['']/g, '')
          filename = decodeURIComponent(filename) // 解碼 URL 編碼
        }
      }

      if (!response.ok) {
        // 如果響應不是 200，則拋出錯誤
        return Promise.reject('下載檔案時發生錯誤: ' + response.status)
      }

      return response.blob().then(blob => ({ blob, filename }))
    })
    .then(({ blob, filename }) => {
      const url = window.URL.createObjectURL(blob)
      const fileLink = document.createElement('a')
      fileLink.href = url
      fileLink.download = filename // 使用從 header 獲取的檔名
      document.body.appendChild(fileLink)
      fileLink.click()
      fileLink.remove()
    })
    .catch((error) => {
      // Handle error here.
      console.error('下載檔案時發生錯誤:', error)
      message.error('下載檔案時發生錯誤:', error)
    })
}
