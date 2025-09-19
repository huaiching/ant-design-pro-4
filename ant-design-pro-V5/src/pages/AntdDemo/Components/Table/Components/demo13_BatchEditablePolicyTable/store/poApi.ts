export const fetchAllData = async (): Promise<any[]> => {
  await new Promise((res) => setTimeout(res, 100)) // 模擬延遲

  const data = Array.from({ length: 10 }, (_, i) => {
    const id = i + 1
    const coInfoList = Array.from({ length: 10 }, (_, j) => ({
      planCodeDesc: `A${id.toString().padStart(2, '0')}${j.toString().padStart(2, '0')}-0`
    }))
    return {
      policyNo: `173200785${id.toString().padStart(3, '0')}`,
      coInfoList: coInfoList,
    }
  })

  return data
}
