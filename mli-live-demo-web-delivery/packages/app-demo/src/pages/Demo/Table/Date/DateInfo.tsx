import { Divider, Typography } from 'antd'

const { Title, Paragraph } = Typography

const DateInfo: React.FC = () => {
  return (
    <Typography>
      <Title level={3}>日期元件</Title>

      <Paragraph>
        本頁面提供2種不同類型的日期元件作為示範
      </Paragraph>

      <Paragraph>
        1. 日期函數 date to AD
        <blockquote>展示民國轉成西元年的功能</blockquote>
        如果年份是4位數，會判斷為西元年，則回傳原始值。
        <br/>
        如果年份低於4位數，就會轉成西元年，若違反函數限制，函數會拋出「null」
      </Paragraph>

      <Paragraph>
        2. 日期函數 date to ROC
        <blockquote>展示西元轉成民國年的功能</blockquote>
        如果年份低於4位數，會判斷為民國年，則回傳原始值。
        <br/>
        如果年份是4位數，且年份不低於1911就會轉成西元年，若違反函數限制，函數會拋出「null」
      </Paragraph>

      <Divider />

      <Paragraph>
        2. 日期欄位
        <blockquote>展示民國年不自動補上0的功能與保存查詢條件的功能</blockquote>
        輸入民國年至查詢欄位時，系統不再自行於數字前方補上0
      </Paragraph>
    </Typography>
  )
}

export default DateInfo