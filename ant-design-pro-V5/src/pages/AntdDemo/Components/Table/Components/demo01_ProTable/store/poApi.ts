export const fetchAllData = async (): Promise<any[]> => {
  await new Promise((res) => setTimeout(res, 100)) // 模擬延遲

  const data = Array.from({ length: 50 }, (_, i) => {
    const id = i + 1
    return {
      key: String(id),
      policyNo: `P20250716${id.toString().padStart(3, '0')}`,
      poStsCode: id % 2 === 0 ? '有效' : '失效',
      poIssueDate: `114/01/${(id % 30 + 1).toString().padStart(2, '0')}`,
    }
  })

  return data
}
