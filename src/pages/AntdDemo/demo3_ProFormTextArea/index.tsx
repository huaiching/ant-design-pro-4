import ProForm, { ProFormInstance, ProFormTextArea } from "@ant-design/pro-form"
import { useRef } from "react"

const Demo: React.FC =() => {
    const formRef = useRef<ProFormInstance>()
    
    return (
        <>
            <h1>ProFormTextArea</h1>
            <ProForm
                grid
                layout='vertical'
                formRef={formRef}
                submitter={false}
            >
                <ProFormTextArea
                    name="description"
                    label="列管原因"
                    colProps={{
                        span: 12
                    }}
                    fieldProps={{   // 參數設定
                        rows: 4, // 設置文本框顯示的行數
                        maxLength: 200, // 限制最大字數
                        showCount: true, // 顯示字數計數
                    }}
                    rules={[        // 檢核
                            { 
                                required: true, 
                            }
                    ]}
                />
            </ProForm>
        </>
    )
}

export default Demo