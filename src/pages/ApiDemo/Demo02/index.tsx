import { CaretDownFilled } from '@ant-design/icons';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Button, Dropdown, Menu, message } from 'antd';
import React, { useRef } from 'react';

const MyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance>()

    const downloadReport = () => {
        const fetchUrl = 'http://localhost:8080/export/exportDemo01?clientId=' + formRef.current?.getFieldValue("clientId");
        fetch(fetchUrl, {
            method: 'GET',
            // 其他設定或是需要傳遞的資料
          })
            .then((response) => {
              // 從 header 中獲取 Content-Disposition
              const disposition = response.headers.get('Content-Disposition');
              let filename = 'output.docx'; // 預設檔名
              // 如果有 Content-Disposition，嘗試解析檔名
              if (disposition && disposition.includes('attachment')) {
                const filenameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                  filename = filenameMatch[1].replace(/['"]/g, '');
                  filename = decodeURIComponent(filename); // 解碼 URL 編碼
                }
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

    return (
        <>
            <PageContainer>
                <ProForm
                    grid
                    layout="vertical"
                    formRef={formRef}
                    submitter={false}
                >
                    <ProFormText
                        name="clientId"
                        label="客戶證號"
                        placeholder="請輸入客戶證號"
                    />
                    <Button type='primary' onClick={async () => {downloadReport()}}>下載報表</Button>
                </ProForm>
            </PageContainer>
        </>
    )
};

export default MyForm;
