
import React, { useRef } from 'react';
import ProForm, { ProFormInstance, ProFormSwitch } from '@ant-design/pro-form';

const MyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance>()

    return (
        <>
            <h1>ProFormSwitch</h1>
            <ProForm
                grid
                layout='vertical'
                formRef={formRef}
                submitter={false}
            >
                <ProFormSwitch
                    name="status"
                    label="啟用狀態"
                    fieldProps={{
                        checkedChildren: '開啟',
                        unCheckedChildren: '關閉',
                    }}
                />
            </ProForm>
        </>
    );
};

export default MyForm;
