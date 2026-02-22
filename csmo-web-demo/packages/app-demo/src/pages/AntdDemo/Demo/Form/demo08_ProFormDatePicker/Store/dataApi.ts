export const fetchAllData = async (): Promise<any> => {
  const data = {
    chkDate: '',
    chkDateYYMM: '114/12',
    chkDateRange: ['112/05/01', '112/05/15'],
    chkDateMulti: ['112/05/01', '112/05/03', '112/05/05'],
    dateList: [
      { start: '112/05/01', end: '112/05/10' },
      { start: '112/06/01', end: '112/06/10' }
    ]
  }

  return data
}
