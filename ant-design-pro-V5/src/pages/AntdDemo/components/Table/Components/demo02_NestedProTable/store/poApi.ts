
// 保障項目資料型別
export type coData = {
  key: string
  coverageNo: string
  planCode: string
  rateScale: string
  coStsCode: string
  coIssueDate: string
}

// 保單資料型別
export type PoData = {
  key: string
  policyNo: string
  poStsCode: string  
  poIssueDate: string
  coList?: coData[] // 子資料：保障清單
}


export const fetchAllData = async (): Promise<PoData[]> => {
  await new Promise((res) => setTimeout(res, 100)) // 模擬延遲
  return [
    {
      key: '1',
      policyNo: 'P20250716001',
      poStsCode: '有效',
      poIssueDate: '2025-01-01',
      coList: [
        {
          key: '1-1',
          coverageNo: 'C001',
          planCode: 'A1',
          rateScale: '01',
          coStsCode: '有效',
          coIssueDate: '2025-01-01',
        },
        {
          key: '1-2',
          coverageNo: 'C002',
          planCode: 'B2',
          rateScale: '02',
          coStsCode: '失效',
          coIssueDate: '2025-03-01',
        },
      ],
    },
    {
      key: '2',
      policyNo: 'P20250716002',
      poStsCode: '失效',
      poIssueDate: '2024-12-20',
      coList: [
        {
          key: '2-1',
          coverageNo: 'C003',
          planCode: 'C3',
          rateScale: '01',
          coStsCode: '有效',
          coIssueDate: '2024-12-20',
        },
      ],
    },
  ]
}