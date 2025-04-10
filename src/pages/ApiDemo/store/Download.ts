import { message } from "antd";

export const downloadPost = (fetchUrl: string, fileType: string, body: any) => {
    fetch(fetchUrl, {
        method: 'POST',
        headers: {      // 設置請求頭
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => {
          // 從 header 中獲取 Content-Disposition
          const disposition = response.headers.get('Content-Disposition');
          let filename = 'download.' + fileType; // 預設檔名
          // 如果有 Content-Disposition，嘗試解析檔名
          if (disposition && disposition.includes('attachment')) {
            const filenameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1].replace(/['"]/g, '');
              filename = decodeURIComponent(filename); // 解碼 URL 編碼
            }
          }

          if (!response.ok) {
            // 如果響應不是 200，則拋出錯誤
            return message.error('下載檔案時發生錯誤: ' + response.status);
          }
          
          return response.blob().then(blob => ({ blob, filename }));
        })
        .then(({ blob, filename }) => {
          const url = window.URL.createObjectURL(blob);
          const fileLink = document.createElement('a');
          fileLink.href = url;
          fileLink.download = filename; // 使用從 header 獲取的檔名
          document.body.appendChild(fileLink);
          fileLink.click();
          fileLink.remove();
        })
        .catch((error) => {
          // Handle error here.
          message.error('下載檔案時發生錯誤:', error);
        });
}

export const downloadGet = (fetchUrl: string, fileType: string) => {
    fetch(fetchUrl, {
        method: 'GET',
      })
    .then((response) => {
        // 從 header 中獲取 Content-Disposition
        const disposition = response.headers.get('Content-Disposition');
        let filename = 'download.' + fileType; // 預設檔名
        // 如果有 Content-Disposition，嘗試解析檔名
        if (disposition && disposition.includes('attachment')) {
            const filenameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1].replace(/['"]/g, '');
                filename = decodeURIComponent(filename); // 解碼 URL 編碼
            }
        }

        if (!response.ok) {
            // 如果響應不是 200，則拋出錯誤
            return message.error('下載檔案時發生錯誤: ' + response.status);
        }
        
        return response.blob().then(blob => ({ blob, filename }));
    })
    .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const fileLink = document.createElement('a');
        fileLink.href = url;
        fileLink.download = filename; // 使用從 header 獲取的檔名
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.remove();
    })
    .catch((error) => {
        // Handle error here.
        message.error('下載檔案時發生錯誤:', error);
    });
}

