/* eslint-disable */
// @ts-ignore
import { baseRequest as request } from '@mli-csmo/app-model'
import type { agent } from './typings'

/** 組合資料範例，總計呼叫三支API，兩支有參數關係，一支無參數關係，為demo1和demo2綜合使用範例 呼叫/data/AgntEntity/search、/data/DeptEntity/search、/data/ClntEntity/search並組合資料 POST /custom/getAgentDetail */
export async function getAgentDetail(body: agent.Criterion, options?: { [key: string]: any }) {
  return request<agent.AgentDetailClientVO>('/custom/getAgentDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 組合資料範例，呼叫兩隻無參數關係的API 呼叫/data/AgntEntity/search和/data/ClntEntity/search，並組合資訊 POST /custom/getAgentDetail/demo1 */
export async function getAgentDetailDemo1(body: agent.Criterion, options?: { [key: string]: any }) {
  return request<agent.AgentDetailClientVO>('/custom/getAgentDetail/demo1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 組合資料範例，呼叫兩隻有參數關係的API 呼叫/data/AgntEntity/search和/data/DeptEntity/search，並組合資訊 POST /custom/getAgentDetail/demo2 */
export async function getAgentDetailDemo2(body: agent.Criterion, options?: { [key: string]: any }) {
  return request<agent.AgentDetailClientVO>('/custom/getAgentDetail/demo2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** (1對1客製化Demo)取得理賠紀錄 (預存程序cc170i)以保單號碼、被保人ID、年度查詢理賠紀錄，會同時查理賠主檔、團險、旅平險 POST /custom/info/queryClaimHistory/v1 */
export async function queryClaimHistory(
  body: agent.QueryClaimHistoryDTO,
  options?: { [key: string]: any }
) {
  return request<agent.QueryClaimHistoryClientVO[]>('/custom/info/queryClaimHistory/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
