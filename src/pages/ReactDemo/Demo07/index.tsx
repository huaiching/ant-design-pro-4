import { PageContainer } from "@ant-design/pro-layout"
import React, { useEffect, useState } from "react"

// 頁面顯示計時器，顯示頁面停留了幾秒
const VDOM: React.FC = () => {
  const [timer, setTimer] = useState(0)
  // Effect 僅在頁面首次渲染時執行
    useEffect(() => {
        // 設定計時器，每 1 秒 執行一次
        // 每次 時間 + 1秒
        setInterval(()=>{
            setTimer(prevTimer => prevTimer + 1)
        },1000)
    },[])
    return (
        <PageContainer>
            <h3>頁面停留 {timer} 秒</h3>
        </PageContainer>
    )
}
export default VDOM
