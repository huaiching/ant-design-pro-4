
import React, { useRef } from 'react';
import ProForm, { ProFormInstance, ProFormUploadButton } from '@ant-design/pro-form';

const MyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance>()

    return (
        <>
            <h1>ProFormUploadButton</h1>
            <ProForm
                grid
                layout='vertical'
                formRef={formRef}
                submitter={false}
            >
                <ProFormUploadButton
                    name="file"
                    label="上傳文件"
                    fieldProps={{
                        action: '/upload', // 上傳接口的路徑
                        maxCount: 1,       // 最多只能上傳一個文件
                    }}
                    rules={[{ required: true, message: '請上傳文件' }]} // 校驗規則，要求文件必須上傳
                />
            </ProForm>
        </>
    );
};

export default MyForm;
