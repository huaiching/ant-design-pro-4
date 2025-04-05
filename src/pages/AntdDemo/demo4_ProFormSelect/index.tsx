import ProForm, { ProFormInstance, ProFormSelect } from "@ant-design/pro-form"
import { useRef } from "react"

const Demo: React.FC =() => {
    const formRef = useRef<ProFormInstance>()
    
    return (
        <>
            <h1>ProFormSelect</h1>
            <ProForm
                grid
                layout='vertical'
                formRef={formRef}
                submitter={false}
            >
                <ProFormSelect
                    name="department"
                    label="選擇部門"
                    placeholder="請選擇部門"
                    colProps={{
                        span: 6
                    }}
                    options={[
                        { value: 'IT', label: '資訊部' },
                        { value: 'HR', label: '人事部' },
                        { value: 'FIN', label: '財務部' },
                    ]}
                    rules={[
                        { required: true, message: '部門為必填項' }
                    ]}
                />
            </ProForm>
        </>
    )
}

export default Demo