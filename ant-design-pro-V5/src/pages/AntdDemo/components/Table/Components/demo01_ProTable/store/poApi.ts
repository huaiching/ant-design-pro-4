export const fetchAllData = async (): Promise<any[]> => {
  await new Promise((res) => setTimeout(res, 100)) // 模擬延遲
  return [
    {
      key: '1',
      policyNo: 'P20250716001',
      poStsCode: '有效',
      poIssueDate: '114/01/01',
    },
    {
      key: '2',
      policyNo: 'P20250716002',
      poStsCode: '失效',
      poIssueDate: '113/12/21',
    },
  ]
}