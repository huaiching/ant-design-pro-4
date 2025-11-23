export let pathConfig = {
    baseApi: "http://localhost:8080"
}

export const mergeApiPath = (configRequest: {
    DXP_PATH: string
  }) => {
    pathConfig = {
      baseApi: configRequest.DXP_PATH ?? pathConfig.baseApi
    }
  }