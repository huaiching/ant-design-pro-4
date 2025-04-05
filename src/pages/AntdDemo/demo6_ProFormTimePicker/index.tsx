
import React, { useRef } from 'react';
import ProForm, { ProFormInstance, ProFormTimePicker } from '@ant-design/pro-form';

const MyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance>()

    return (
        <>
            <h1>ProFormTimePicker</h1>
            <ProForm
                grid
                layout='vertical'
                formRef={formRef}
                submitter={false}
            >
                <ProFormTimePicker
                    name="time"
                    label="選擇時間"
                    placeholder="請選擇時間"
                    rules={[
                        { required: true, message: '時間為必填項' },
                    ]}
                    fieldProps={{
                        format: 'HH時mm分ss秒'
                    }}
                />
            </ProForm>
        </>
    );
};

export default MyForm;
