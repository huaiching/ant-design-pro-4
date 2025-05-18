import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { Button, Segmented } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { editOption } from './store/editOption';

const InsurancePolicyCard: React.FC = () => {
    const formRef = useRef<ProFormInstance>()
    const [poEdit, setPoEdit] = useState<Boolean>(false)

    useEffect(()=>{
        formRef.current?.setFieldsValue({
            policyNo: '1234567890',
            poStsCode: '42',
        })
    },[])

    return (
        <ProForm
            grid
            layout="vertical"
            formRef={formRef}
            submitter={false}
        >
            <ProCard 
                title="保單資訊" 
                type='default' 
                size='default' 
                headerBordered      // 有 分隔線
                collapsible         // 有 摺疊
                defaultCollapsed    // 預設 折疊
                extra={
                    // 分段控制器: 這裡用來控制 編輯 的切換
                    <Segmented
                        options={editOption}        // 分頁控制器的內容設定 (預設選擇第一個)
                        onChange={(value) => {      // 切換事件：value=切換後的數值
                            setPoEdit(value === 'edit');
                        }}
                    />
                }
            >
                <ProFormText
                    name="policyNo"
                    label="保單號碼"
                    readonly={!poEdit}
                />
                <ProFormText
                    name="poStsCode"
                    label="保單狀態"
                    readonly={!poEdit}
                />
            </ProCard>

            <Button 
                type='primary'
                onClick={() => {
                    console.log('formRef',formRef.current?.getFieldsValue())
                }}
            >console.log 檢視數據</Button>
        </ProForm>
    );
};

export default InsurancePolicyCard;
