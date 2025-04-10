import { CaretDownFilled } from '@ant-design/icons';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Button, Dropdown, Menu, message } from 'antd';
import React, { useRef } from 'react';

const MyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance>()

    const clntSave = () => {
        fetch('http://localhost:8080/clnt/save', {
            method: 'POST', // 發送 POST 請求
            headers: {      // 設置請求頭
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    clientId: formRef.current?.getFieldValue("clientId"),
                    names: formRef.current?.getFieldValue("names"),
                    birthDate: formRef.current?.getFieldValue("birthDate"),
                    sex: formRef.current?.getFieldValue("sex"),
                }
            )
        })
        .then(response => {
            if (response.status === 200) {
                message.success("新增成功")
            } else {
                message.error("新增失敗")
            }
        }) 
    }

    return (
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
                <ProFormText
                    name="names"
                    label="姓名"
                    placeholder="請輸入姓名"
                />
                <ProFormText
                    name="birthDate"
                    label="出生日期"
                    placeholder="請輸入出生日期"
                />
                <ProFormText
                    name="sex"
                    label="性別"
                    placeholder="請輸入性別"
                />
                <Button type='primary' onClick={async () => {clntSave()}}>clnt 資料存檔</Button>
            </ProForm>
        </PageContainer>
    )
};

export default MyForm;
