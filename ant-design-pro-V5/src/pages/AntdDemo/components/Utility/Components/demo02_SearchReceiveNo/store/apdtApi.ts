
const recevieData = [
  {poChgReceNo: 'P0036986', poChgStsCode: 'C', poChgReceDate: '114/01/20'},
  {poChgReceNo: 'P0036987', poChgStsCode: 'C', poChgReceDate: '114/01/21'},
  {poChgReceNo: 'P0036988', poChgStsCode: '2', poChgReceDate: '114/01/23'},
]

const mockData = Array.from({ length: 9 }, (_, index) => ({
  poChgReceNo: `P003698${index + 1}`,
  poChgStsCode: 'C',
  poChgReceDate: `114/01/0${index + 1}`,
}))

export const fetchData = async (): Promise<{ data: any[]; total: number }> => {

  const filteredData = mockData

  // 模擬等待 3 秒
  await new Promise((resolve) => setTimeout(resolve, 3))

  return {
    data: filteredData,
    total: filteredData.length,
  }
}
