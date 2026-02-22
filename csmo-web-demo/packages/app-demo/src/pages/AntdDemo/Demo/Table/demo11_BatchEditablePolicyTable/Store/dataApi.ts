export const editTableDataApi = async (): Promise<any[]> => {
  await new Promise((res) => setTimeout(res, 100)) // 模擬延遲

  const data = [
    {
      id: (Math.random() * 1000000).toFixed(0),
      policyNo: '173200785003',
      planCodeDesc: 'A0302-0',
    },
    {
      id: (Math.random() * 1000000).toFixed(0),
      policyNo: '173200785003',
      planCodeDesc: 'A0303-0',
    },
  ]

  return data
}

export const fetchAllDataApi = async (): Promise<any[]> => {
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

