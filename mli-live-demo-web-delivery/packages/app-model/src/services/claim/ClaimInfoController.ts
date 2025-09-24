/* eslint-disable */
// @ts-ignore
import { baseRequest as request } from '@mli-csmo/app-model'
import type { claim } from './typings'

/** 取得理賠基本資料 (預存程序cc171i)以保單號碼、理賠序號、年度查詢理賠基本資料 POST /proxy/info/queryClaimBasicInfo/v1 */
export async function queryClaimBasicInfo(
  body: claim.QueryClaimBasicInfoDTO,
  options?: { [key: string]: any }
) {
  return request<claim.ClaimBasicInfoVO>('/proxy/info/queryClaimBasicInfo/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 取得理賠紀錄 (預存程序cc170i)以保單號碼、被保人ID、年度查詢理賠紀錄，會同時查理賠主檔、團險、旅平險 POST /proxy/info/queryClaimHistory/v1 */
export async function queryClaimHistory(
  body: claim.QueryClaimHistoryDTO,
  options?: { [key: string]: any }
) {
  return request<claim.ClaimHistoryVO[]>('/proxy/info/queryClaimHistory/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
