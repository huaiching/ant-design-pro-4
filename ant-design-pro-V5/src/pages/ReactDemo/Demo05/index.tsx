import { PageContainer } from '@ant-design/pro-layout'
import { Button, Row, Space } from 'antd'
import React, { useReducer } from 'react'

const MyComponent: React.FC = () => {
  /**
   * reducer函式: 自定義的狀態改變函式
   * @param state   目前的狀態機變數
   * @param action  執行的操作物件，通常至少會有兩個參數：
   *                type:   操作類型
   *                value:  操作值
   * @returns 
   */
  const cityReducer = (state: any, action: any) => {
    // 根據 操作類型(action.type) 來判斷要執行的改變公式
    switch (action.type) {
      // 類型台北: 會進行數量的加減
      case "taipei":
        return {
          ...state,
          taipei: state.taipei + action.value
        }
      // 類型台中: 會進行數量的加減
      case "taichung":
        return {
          ...state,
          taichung: state.taichung + action.value
        }
      // 類型高雄: 會進行數量的加減
      case "kaohsiung":
        return {
          ...state,
          kaohsiung: state.kaohsiung + action.value
        }
        // 其他類型: 不進行改變
      default:
        return state
    }
  }
 
  /**
   * useReducer的宣告
   * const [變數, 狀態改變方法] = useReducer(狀態改變方法會啟動的函式, 初始值)
   */
  const [cityState, cityDispatch] = useReducer(cityReducer, {
    taipei: 0,
    taichung: 0,
    kaohsiung: 0,
  })

  // 要執行 useReducer 的狀態改變，需要呼叫 狀態改變方法
  return (
    <PageContainer>
      <Row>
        <Space>
          <h3>台北報名人數: {cityState.taipei}</h3>
          <Button onClick={() => cityDispatch({type: "taipei", value: 1})}>+ 1</Button>
          <Button onClick={() => cityDispatch({type: "taipei", value: -1})}>- 1</Button>
        </Space>
      </Row>
      <Row>
        <Space>
          <h3>台中報名人數: {cityState.taichung}</h3>
          <Button onClick={() => cityDispatch({type: "taichung", value: 1})}>+ 1</Button>
          <Button onClick={() => cityDispatch({type: "taichung", value: -1})}>- 1</Button>
        </Space>
      </Row>
      <Row>
        <Space>
          <h3>高雄報名人數: {cityState.kaohsiung}</h3>
          <Button onClick={() => cityDispatch({type: "kaohsiung", value: 1})}>+ 1</Button>
          <Button onClick={() => cityDispatch({type: "kaohsiung", value: -1})}>- 1</Button>
        </Space>
      </Row>
    </PageContainer>
  )
}

export default MyComponent
