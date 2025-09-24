/* eslint-disable */
// @ts-ignore
import { baseRequest as request } from '@mli-csmo/app-model'
import type { claim } from './typings'

/** 取得理賠就診醫院 (預存程序cc179i)以保單號碼、理賠序號、年度查詢理賠就診醫院 POST /proxy/hosipital/queryClaimHospital/v1 */
export async function queryClaimHospital(
  body: claim.QueryClaimHospitalDTO,
  options?: { [key: string]: any }
) {
  return request<claim.ClaimHospitalVO[]>('/proxy/hosipital/queryClaimHospital/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 取得就診明細醫院 以保單號碼、理賠序號、年度、明細序號查詢就診明細 (clhd未有合理主鍵，資料可能有誤) POST /proxy/hosipital/queryClaimHospitalDetail/v1 */
export async function queryClaimHospitalDetail(
  body: claim.QueryClaimHospitalDetailDTO,
  options?: { [key: string]: any }
) {
  return request<claim.ClaimHospitalDetailVO[]>('/proxy/hosipital/queryClaimHospitalDetail/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
