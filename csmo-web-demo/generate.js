const openAPI = require('@mli-csmo/openapi')

const appUrlMap = {
  baseApi: 'http://192.168.238.200:9088'
}

const gen = async () => {
  openAPI.generateService({
    requestLibPath: "import { baseRequest as request } from '@mli-csmo/app-model'",
    schemaPath: appUrlMap.baseApi + '/v3/api-docs/training',
    serversPath: './packages/app-model/src/services',
    projectName: 'training',
    namespace: 'training',
    hook: {
      customFunctionName: (data) => {
        if (!data.summary) {
          return data.path.substring(data.path.lastIndexOf('/') + 1)
        }
        return data.operationId
      },
      customTypeName: (data) => {
        if (!data.summary) {
          return data.path.substring(data.path.lastIndexOf('/') + 1)
        }
        const typeName = data.summary
        return typeName.replace(typeName[0], typeName[0].toUpperCase())
      }
    }
  })
}

gen()
