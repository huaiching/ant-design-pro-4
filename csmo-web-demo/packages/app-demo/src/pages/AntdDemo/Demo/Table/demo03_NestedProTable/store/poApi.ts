export const fetchAllData = async (): Promise<any[]> => {
  await new Promise((res) => {setTimeout(res, 100)}) // 模擬延遲
  return [
    {
      key: '1',
      policyNo: 'P20250716001',
      poStsCode: '有效',
      poIssueDate: '114/01/01',
      coList: [
        {
          key: '1-1',
          coverageNo: 'C001',
          planCode: 'A1',
          rateScale: '01',
          coStsCode: '有效',
          coIssueDate: '114/01/01'
        },
        {
          key: '1-2',
          coverageNo: 'C002',
          planCode: 'B2',
          rateScale: '02',
          coStsCode: '失效',
          coIssueDate: '114/03/01'
        }
      ]
    },
    {
      key: '2',
      policyNo: 'P20250716002',
      poStsCode: '失效',
      poIssueDate: '113/12/20',
      coList: [
        {
          key: '2-1',
          coverageNo: 'C003',
          planCode: 'C3',
          rateScale: '01',
          coStsCode: '有效',
          coIssueDate: '113/12/20'
        }
      ]
    }
  ]
}
