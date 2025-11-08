# 附錄 - 下載後端API產出的檔案

對於 複雜的報表檔案，通常會由 後端 產生bye[] 格式的二進位檔案 (excel, word, pdf……)
如果 想要在前端 讓使用者可以下載這類的檔案，
通常 會透過 Button 來呼叫 後端的檔案API 取得 檔案的資料流
並且 必須將 檔案的資料流 轉換為 檔案連結，才會跳出下載視窗，讓使用者可以下載檔案

下面是 檔案的資料流 轉換為 檔案連結 的範例

```tsx
    await 後端API方法(參數, {
        responseType: 'blob',     // 回應請求設定為 blob (二進位檔案)
        getResponse: true         // 需要完整的回應物件 (包含 標題 等)
      })
      .then((res: any) => {
        // data = 檔案流 ； response = 標題資訊
        const { data, response } = res
        // 從 標題資訊 取得 content-disposition 的 數值 (裡面會有檔案名資訊)
        const str: string | null = response.headers.get('content-disposition') || ''
        // 從 content-disposition 解析出 檔名資訊
        const filename = str?.split(';')[1]?.split('filename=')[1] || ''
        // 產生 檔案下載，檔名從 content-disposition 取得
        FileSaver.saveAs(data, decodeURIComponent(filename))
      })
```
