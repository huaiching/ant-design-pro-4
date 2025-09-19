export const fetchAllData = async (): Promise<any[]> => {
  await new Promise((res) => setTimeout(res, 100)) // 模擬延遲

  const data = Array.from({ length: 50 }, (_, i) => {
    const id = i + 1
    return {
      policyNo: `173200785${id.toString().padStart(3, '0')}`,
      coInfoList: [
        {planCodeDesc: `A${id.toString().padStart(3, '0')}-1`},
        {planCodeDesc: `B${id.toString().padStart(3, '0')}-2`}
      ]
    }
  })

  return data
}
