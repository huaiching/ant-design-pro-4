export const fetchAllData = async (): Promise<any[]> => {
  const data = [
    { id: 1, item: '001', amount: 1000 },
    { id: 2, item: '003', amount: 50 }
  ]

  return data
}
