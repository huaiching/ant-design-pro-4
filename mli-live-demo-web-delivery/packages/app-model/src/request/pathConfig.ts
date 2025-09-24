export const pathConfig = {
  // 測試地址後期調整
  baseApi: 'https://csmo-live-demo-claim-mid.core-dev.mcp.mli.com.corp'
}

export const mergeApiPath = (midPathConfig: {
  BASE_API: string
}) => {
  pathConfig.baseApi = midPathConfig.BASE_API ?? pathConfig.baseApi
}
