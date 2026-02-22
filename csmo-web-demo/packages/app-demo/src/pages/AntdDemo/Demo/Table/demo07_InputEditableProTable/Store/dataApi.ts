export const fetchAllData = async (): Promise<any[]> => {
  const data = [
      {
        id: (Math.random() * 1000000).toFixed(0),
        policyNo: 'P0000001',
        poStsCode: '有效',
        planCode: 'A01',
        node: 'N'
      },
      {
        id: (Math.random() * 1000000).toFixed(0),
        policyNo: 'P0000002',
        poStsCode: '有效',
        planCode: 'A01',
        node: 'Y'
      }
  ]

  return data
}
