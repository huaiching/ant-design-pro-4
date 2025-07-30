export const fetchAllData = async (): Promise<any[]> => {
  await new Promise((res) => setTimeout(res, 100)) // 模擬延遲
  return [
    {
      key: '1',
      policyNo: 'P20250716001',
      poStsCode: '有效',
      poIssueDate: '2025-01-01',
    },
    {
      key: '2',
      policyNo: 'P20250716002',
      poStsCode: '失效',
      poIssueDate: '2024-12-20',
    },
  ]
}