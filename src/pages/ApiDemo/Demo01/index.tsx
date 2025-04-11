import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space } from 'antd';
import React, { useRef } from 'react';
import { callActionApi, callDataApi } from '../store/apiCaller';

const MyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance>()

    const clntSave = () => {
        callActionApi('POST', 'http://localhost:8080/clnt/save', 
            {
                clientId: formRef.current?.getFieldValue("clientId"),
                names: formRef.current?.getFieldValue("names"),
                birthDate: formRef.current?.getFieldValue("birthDate"),
                sex: formRef.current?.getFieldValue("sex"),
            })
    }
    const clntDelete = () => {
        const url = 'http://localhost:8080/clnt/deleteById?clientId=' + formRef.current?.getFieldValue("clientId")
        callActionApi('DELETE', url)
    }
    const clntQuery = () => {
        const url = 'http://localhost:8080/clnt/findById?clientId=' + formRef.current?.getFieldValue("clientId")
        callDataApi('GET', url)
        .then((data) => {
            formRef.current?.setFieldsValue({
                names: data?.names,
                birthDate: data?.birthDate,
                sex: data?.sex,
            })
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
                <Space>
                    <Button type='primary' onClick={async () => {clntSave()}}>clnt 資料存檔</Button>
                    <Button type='primary' onClick={async () => {clntDelete()}}>clnt 資料刪除</Button>
                    <Button type='primary' onClick={async () => {clntQuery()}}>clnt 資料查詢</Button>
                </Space>
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
            </ProForm>
        </PageContainer>
    )
};

export default MyForm;
