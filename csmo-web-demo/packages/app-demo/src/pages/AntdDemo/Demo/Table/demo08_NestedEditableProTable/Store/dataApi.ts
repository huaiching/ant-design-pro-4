export const fetchAllData = async (): Promise<any[]> => {
  const data = [
    {
      id: (Math.random() * 1000000).toFixed(0),
      policyNo: '100000000001',
      poStsCode: '有效',
      poIssueDate: '114/01/10',
      coList: [
        {
          id: (Math.random() * 1000000).toFixed(0),
          coverageNo: 1,
          planCode: 'A001',
          rateScale: '0',
          coStsCode: '有效',
          coIssueDate: '114/01/01'
        },
        {
          id: (Math.random() * 1000000).toFixed(0),
          coverageNo: 2,
          planCode: 'A002',
          rateScale: '0',
          coStsCode: '有效',
          coIssueDate: '114/01/01'
        }
      ]
    },
    {
      id: (Math.random() * 1000000).toFixed(0),
      policyNo: '100000000002',
      poStsCode: '有效',
      poIssueDate: '113/10/14',
      coList: [
        {
          id: (Math.random() * 1000000).toFixed(0),
          coverageNo: 1,
          planCode: 'B001',
          rateScale: '0',
          coStsCode: '有效',
          coIssueDate: '113/10/14'
        },
        {
          id: (Math.random() * 1000000).toFixed(0),
          coverageNo: 2,
          planCode: 'B002',
          rateScale: '0',
          coStsCode: '有效',
          coIssueDate: '113/10/14'
        }
      ]
    }
  ]

  return data
}
