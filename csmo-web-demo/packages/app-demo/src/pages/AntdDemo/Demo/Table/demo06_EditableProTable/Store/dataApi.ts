export const fetchAllData = async (): Promise<any[]> => {
  const data = [
      {
        id: 1,
        name: '測試人員 A',
        age: 25,
        birthDate: '089/01/10',
        sex: '1'
      },
      {
        id: 2,
        name: '測試人員 B',
        age: 10,
        birthDate: '104/01/10',
        sex: '2'
      }
  ]

  return data
}
