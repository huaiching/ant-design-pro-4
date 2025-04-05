import { CaretDownFilled, DownCircleTwoTone } from '@ant-design/icons';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Button, Dropdown, Menu, message } from 'antd';
import axios from 'axios';
import React, { useRef, useEffect } from 'react';

const MyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance>()

    const submitter = () => {
        return {
            render: () => (
                <FooterToolbar>
                    <Button
                        type='primary'
                        onClick={async () => {
                            message.success("提交成功")
                            fetch('http://localhost:8080/clnt/findAllById', {
                                method: 'POST', // 發送 POST 請求
                                headers: {      // 設置請求頭
                                    'accept': '*/*',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(
                                    [
                                        "A123456789"
                                    ]
                                )
                            })
                            .then(response => response.json())  // 解析 JSON 響應
                            .then(data => {
                                console.log('Success:', data);
                                // 在這裡處理回傳的數據
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                // 在這裡處理錯誤
                            });
                        }}
                    >確認</Button>
                    <Button
                        onClick={async () => {
                            message.warning("取消作業")
                        }}
                    >取消</Button>
                </FooterToolbar>
            )
        }
    }

    return (
        <>
            {/* <h1>ProFormText</h1> */}
            <PageContainer
                header={{
                    title: 'ProFormText',
                    extra: [
                        <Dropdown
                            placement='bottom'
                            trigger={['click']}
                            overlay={(
                                <Menu>
                                    <Menu.Item
                                        onClick={() => {
                                            message.info('按了功能 1')
                                        }}
                                    >功能 1</Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            message.info('按了功能 2')
                                        }}
                                    >功能 2</Menu.Item>
                                </Menu>
                            )}
                        >
                            <Button type='primary'>功能<CaretDownFilled /></Button>
                        </Dropdown>
                    ]
                }}
            >
                <ProForm
                    grid
                    layout="vertical"
                    formRef={formRef}
                    submitter={submitter()}
                >
                    <ProFormText
                        name="username"
                        label="用戶名稱"
                        tooltip="這是用戶名稱"
                        placeholder="請輸入用戶名稱"
                        colProps={{
                            span: 6
                        }}
                        rules={[
                            {
                                required: true,
                                message: '用戶名稱為必填項',
                            },
                        ]}
                        fieldProps={{
                            maxLength: 20
                        }}
                    />
                </ProForm>
            </PageContainer>
        </>
    )
};

export default MyForm;
