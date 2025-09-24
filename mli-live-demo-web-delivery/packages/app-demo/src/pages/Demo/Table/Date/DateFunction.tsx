import { dateToADDate, dateToROCDate } from '@mli-csmo/base'
import { Button, DatePicker, Input, Space } from 'antd'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import { useIntl } from 'umi'

const DateFunction: React.FC = () => {
  const [minguoYear, setMinguoYear] = useState<Dayjs | null>(null)
  const [convertedMinguoYear, setConvertedMinguoYear] = useState<string | undefined | null>('')
  const [aDYear, setADYear] = useState<string | undefined | null>('')
  const [convertedADYear, setConvertedADYear] = useState<string | undefined | null>('')
  const { formatMessage } = useIntl()

  const handleMinguoConvert = () => {
    if (minguoYear) {
      const converted = dateToADDate(minguoYear, formatMessage)
      setConvertedMinguoYear(converted)
    } else {
      setConvertedMinguoYear('請先選擇時間')
    }
  }

  const handleADConvert = () => {
    if (aDYear) {
      const converted = dateToROCDate(aDYear, formatMessage)
      setConvertedADYear(converted)

      if (!converted) {
        setConvertedADYear('不符合規定的時間')
      }
    } else {
      setConvertedADYear('請先選擇時間')
    }
  }


  return (
    <>
      <Space>
        <DatePicker
          onChange={(value) => setMinguoYear(value)}
          placeholder="選擇民國年"
        />
        <Button type="primary" onClick={handleMinguoConvert}>
          轉換成西元年
        </Button>
      </Space>

      {convertedMinguoYear && (
        <div>西元年 ： {convertedMinguoYear}</div>
      )}
      <br />
      <br />
      <br />

      <Space>
        <Input
          onChange={(event) => setADYear(event.target.value)}
          placeholder="YYYY/MM/DD"
        />
        <Button type="primary" onClick={handleADConvert}>
          轉換成民國年
        </Button>
      </Space>

      {convertedADYear && (
        <div>民國年 ： {convertedADYear}</div>
      )}
    </>
  )
}

export default DateFunction