import dayjs, { Dayjs } from "dayjs"

interface params {
  policyNo?: string
  receiveNo?: string
  receiveDate?: string
  chgDate?: string
  chgType?: string
}

export const poChgApi = async (params: params): Promise<any[]> => {
  await new Promise((res) => setTimeout(res, 100)) // 模擬延遲

  let data = Array.from({ length: 50 }, (_, i) => {
    const id = i + 1
    return {
      policyNo: `173200785${id.toString().padStart(3, '0')}`,
      receiveNo: `P00000${id.toString().padStart(3, '0')}`,
      receiveDate: dayjs('114/02/20', 'TTT/MM/DD').add(i, 'day').format('TTT/MM/DD'),
      chgDate: dayjs('114/02/20', 'TTT/MM/DD').add(i + 3, 'day').format('TTT/MM/DD'),
      chgType: i % 3 === 0 ? '0' :
               i % 3 === 1 ? '1' : '2'
    }
  })

  return data
    .filter((e) => !params.policyNo || e.policyNo === params.policyNo)
    .filter((e) => !params.receiveNo || e.receiveNo === params.receiveNo)
    .filter((e) => !params.receiveDate || e.receiveDate === params.receiveDate)
    .filter((e) => !params.chgDate || e.chgDate === params.chgDate)
    .filter((e) => !params.chgType || e.chgType === params.chgType)
}
