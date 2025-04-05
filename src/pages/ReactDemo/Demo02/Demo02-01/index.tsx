import './store/index.css'    // 引入 css 樣式模組
import Demo from './components/demo1'
import { PageContainer } from '@ant-design/pro-layout'

const VDOM: React.FC = () => {
    const idvName = "divId"     // 設定變數
    const data = "Hello JSX"
    return (
        <PageContainer>
            {/* 子組件要使用 大寫開頭 */}
            <Demo/>
            {/* JS表達式 要用 {} 包住 */}
            <div id={idvName}>
                {/* 使用 css 樣式模組:，要用 className 屬性 */}
                <h1 className="titleCss">
                    <span>此單元為 </span>
                    {/* css 行內樣式 使用範例 */}
                    <span style={{color:"orange", fontSize:"20px"}}>
                        {data}
                    </span>
                </h1>
            </div>
        </PageContainer>
    )
}

export default VDOM
