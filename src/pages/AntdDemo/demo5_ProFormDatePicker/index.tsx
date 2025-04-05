import React, { useRef } from 'react';
import ProForm, { ProFormDatePicker, ProFormInstance } from '@ant-design/pro-form';
import moment from 'moment';

const MyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance>()
    const momentTW = require('moment-taiwan');
    
    return (
        <>
            <h1>ProFormDatePicker</h1>
            <ProForm
                grid
                layout='vertical'
                formRef={formRef}
                submitter={false}
            >
                <ProFormDatePicker
                    name="date"
                    label="選擇日期"
                    // placeholder="請選擇日期"
                    rules={[
                        { required: true, message: '日期為必填項' },
                    ]}                    
                    fieldProps={{
                        format: (data: any) => momentTW(data).format('tYY/MM/DD'),
                        // format: 'tYY/MM/DD',
                        disabledDate: (current) => {
                            return current && current > moment()
                        },
                    }}
                />
            </ProForm>
        </>
    );
};

export default MyForm;
