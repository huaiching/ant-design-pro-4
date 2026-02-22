import { dayjsToRocString, dayjsToRocStringMonth, rocStringToDayjs, rocStringToDayjsMonth } from '@/utils/Dayjs/rocDateUtils'
import ProForm, {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormList
} from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import { Button, DatePicker, List, message, Modal } from 'antd'
import React, { useEffect, useRef } from 'react'
import { fetchAllData } from './Store/dataApi'
import { Dayjs } from 'dayjs'

const MyForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>()

  // 資料讀取
  const readData = async () => {
    const req = await fetchAllData()
    // 日期格式轉換
    const data = {
      ...req,
      chkDate: rocStringToDayjs(req?.chkDate),
      chkDateYYMM: rocStringToDayjsMonth(req?.chkDateYYMM),
      chkDateRange: [
        rocStringToDayjs(req.chkDateRange[0]),
        rocStringToDayjs(req.chkDateRange[1])
      ],
      chkDateMulti: (req.chkDateMulti as string[]).map((item) => rocStringToDayjs(item)),
      dateList: req.dateList.map((item: any) => ({
        dateRange: [rocStringToDayjs(item.start), rocStringToDayjs(item.end)]
      }))
    }
    // formRef 資料儲存
    formRef.current?.setFieldsValue(data)
  }

  // 初始載入時的設定
  useEffect(() => {
    // 讀取資料
    readData()

    // 離開頁面前的處理
    return () => {
      // 離開頁面前先將資料塞回 mobx
      handleValueChange()
    }
  }, []);

  // 表單值變更處理: 同步更新 Mobx 資料
  const handleValueChange = () => {
    // 資料轉換
    const data = formRefToMobx()
    // 呼叫 Mobx 的 setting
  }

  // 資料轉換: form 轉 mobx
  const formRefToMobx = () => {
    const values = formRef.current?.getFieldsValue()
    // 日期格式轉換
    const chkDate = dayjsToRocString(values.chkDate)
    const chkDateYYMM = dayjsToRocStringMonth(values.chkDateYYMM)
    const chkDateRange = () => {
      const chkDateRange = values?.chkDateRange || ['', '']
      return [
        dayjsToRocString(chkDateRange[0]), dayjsToRocString(chkDateRange[1])
      ]
    }
    const chkDateMulti = values?.chkDateMulti
      ? (values.chkDateMulti as Dayjs[]).map((item) => dayjsToRocString(item))
      : []
    const dateList = values?.dateList
      ? (values.dateList as any[]).map((item) => {
        const dateRange = item?.dateRange || ['', '']
        return {
          start: dayjsToRocString(dateRange[0]),
          end: dayjsToRocString(dateRange[1])
        }
      })
      : []

    return {
      ...values,
      chkDate: chkDate,
      chkDateYYMM: chkDateYYMM,
      chkDateRange: chkDateRange(),
      chkDateMulti: chkDateMulti,
      dateList: dateList
    }
  }

  // 控制送出後之動作
  const submitterRender = () => {
    Modal.confirm({
      content: "確定要送出嗎？",
      onOk() {
        formRef.current?.validateFields().then(() => {
          const data = formRefToMobx()
          console.log('表單數據', data);

          message.success('表單提交成功！')
        })
      },
      onCancel() {
        // 取消按鈕 點擊後 要進行的 API 操作
        message.warning('取消作業')
      }
    })
  }

  return (
    <PageContainer>
      <ProForm
        grid
        layout="vertical"
        formRef={formRef}
        submitter={false}
        onValuesChange={handleValueChange}
      >
        <MliFormRow>
          <ProFormDatePicker
            name="chkDate"
            label="選擇日期"
            placeholder="請選擇日期"
            rules={[{ required: true, message: '日期為必填項' }]}
            fieldProps={{
              format: 'TTT/MM/DD',
              style: { width: '100%' },
              inputReadOnly: false,
            }}
          />
          <ProFormDatePicker.Month
            name="chkDateYYMM"
            label="選擇月份"
            placeholder="請選擇月份"
            rules={[{ required: true, message: '日期為必填項' }]}
            fieldProps={{
              format: 'TTT/MM',
              style: { width: '100%' },
            }}
          />
          <ProFormDateRangePicker
            name="chkDateRange"
            label="選擇日期區間"
            rules={[{ required: true, message: '日期為必填項' }]}
            fieldProps={{
              format: 'TTT/MM/DD',
              style: { width: '100%' },
            }}
          />
          {/* 多選日期 */}
          <MliFormCol colSize={1}>
            <ProForm.Item
              name="chkDateMulti"
              label="多選日期 (僅能使用滑鼠點選)"
              rules={[{ required: true, message: '請至少選擇一個日期' }]}
            >
              <DatePicker
                multiple
                format="TTT/MM/DD"
                placeholder="請選擇多個日期"
                maxTagCount="responsive"
              />
            </ProForm.Item>
          </MliFormCol>

          <MliFormCol colSize={2}>
            <ProFormList
              name="dateList"
              label="選擇日期區間"
              copyIconProps={false} // 禁用「複製此行」按鈕
              // deleteIconProps={false} // 禁用默認的「刪除此行」按鈕
              alwaysShowItemLabel // 總是顯示項目標籤
            >
              {/* field : 數值資料 */}
              {/* index : 索引值，從 0 開始 */}
              {/* action: 操作方法，add=新增 / remove=刪除 */}
              {/* count : 總筆數 */}
              {(field, index, action, count) => (
                <ProFormDateRangePicker
                  name="dateRange"
                  rules={[{ required: true, message: '日期為必填項' }]}
                  fieldProps={{
                    format: 'TTT/MM/DD',
                    style: { width: '100%' },
                  }}
                />
              )}
            </ProFormList>
          </MliFormCol>
        </MliFormRow>
        <List
          size="small"
          dataSource={[
            "1. Date: 日期格式 fieldProps.format 設定為 'TTT/MM/DD' (民國年)。",
            "2. 前端資料 日期為 字串(string) 時，需轉換為 Dayjs 格式才可使用，請使用：",
            "　dayjs(stringDate, 'TTT/MM/DD').isValid() ? dayjs(stringDate, 'TTT/MM/DD') : null",
            "　dayjs(stringDate, 'TTT/MM').isValid() ? dayjs(stringDate, 'TTT/MM') : null",
            "　或是 小工具 中的 rocStringToDayjs(stringDate) 與 rocStringToDayjsMonth(stringDate)",
            "3. 導出數據時，要使用 dayjs(XXX).format('TTT/MM/DD') 來將 日期 轉換為 string",
            "　或是 小工具 中的 dayjsToRocString(dayjsDate) 與 dayjsToRocStringMonth(dayjsDate)"
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />

        {/* 底部功能區 */}
        <FooterToolbar>
          <Button type='primary' onClick={submitterRender}>送出</Button>
        </FooterToolbar>
      </ProForm>
    </PageContainer>
  )
}
export default MyForm
