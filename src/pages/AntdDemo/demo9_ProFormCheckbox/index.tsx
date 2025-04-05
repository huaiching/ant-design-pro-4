
import React, { useRef } from 'react';
import ProForm, { ProFormCheckbox, ProFormInstance } from '@ant-design/pro-form';

const MyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance>()

    return (
        <>
            <h1>ProFormCheckbox.Group</h1>
            <ProForm
                grid
                layout='vertical'
                formRef={formRef}
                submitter={false}
            >
                <ProFormCheckbox.Group
                    name="hobbies"
                    label="選擇興趣"
                    options={[
                        { label: '讀書', value: 'reading' },
                        { label: '旅行', value: 'travelling' },
                        { label: '運動', value: 'sports' },
                    ]}
                    rules={[{ required: true, message: '請選擇至少一個興趣' }]}
                />
            </ProForm>
        </>
    );
};

export default MyForm;
