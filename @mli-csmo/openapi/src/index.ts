import http from 'http'
import https from 'https'
import fetch from 'node-fetch'
import type {OperationObject} from 'openapi3-ts'
import {ServiceGenerator} from './generator/serviceGenerator'

const getImportStatement = (requestLibPath: string) => {
  if (requestLibPath && requestLibPath.startsWith('import')) {
    return requestLibPath
  }
  if (requestLibPath) {
    return `import request from '${requestLibPath}'`
  }
  return 'import { request } from "umi"'
}

export type GenerateServiceProps = {
  requestLibPath?: string
  requestImportStatement?: string
  // api 的前綴
  apiPrefix?:
    | string
    | ((params: {
        path: string
        method: string
        namespace: string
        functionName: string
        autoExclude?: boolean
      }) => string)
  // 生成的文件夾的路徑
  serversPath?: string
  // openAPI 3.0 的地址
  schemaPath?: string
  // 專案名稱
  projectName?: string

  hook?: {
    // 自訂函數名稱
    customFunctionName?: (data: OperationObject) => string
    // 自訂類型名稱
    customTypeName?: (data: OperationObject) => string
    // 自訂類名
    customClassName?: (tagName: string) => string
  }
  namespace?: string

  pageFolder?: string

  mockFolder?: string
  // 模板文件的文件路徑
  templatesFolder?: string

  // 列舉樣式
  enumStyle?: 'string-literal' | 'enum'
}

export const getSchema = async (schemaPath: string) => {
  if (schemaPath.startsWith('http')) {
    const protocol = schemaPath.startsWith('https:') ? https : http
    try {
      const agent = new protocol.Agent({
        rejectUnauthorized: false
      })
      const json = await fetch(schemaPath, { agent }).then((rest) => rest.json())
      return json
    } catch (error) {
      console.error('fetch openapi error:', error)
    }
    return null
  }
  const schema = require(schemaPath)
  return schema
}

const getOpenAPIConfig = async (schemaPath: string) => {
  const schema = await getSchema(schemaPath)
  if (!schema) {
    return null
  }
  return schema
}

/**
 * 從 appName 生成 service 數據
 * @param param0 - 包含生成 service 所需的參數
 * @param param0.requestLibPath - 自訂的 request 函數路徑
 * @param param0.requestImportStatement - 自訂的 request 導入語句
 * @param param0.apiPrefix - API 的前綴，可以是字串或函數
 * @param param0.serversPath - 生成的文件夾路徑
 * @param param0.schemaPath - openAPI 3.0 的地址
 * @param param0.projectName - 專案名稱
 * @param param0.hook - 自訂的 hook 函數，包含自訂函數名稱、類型名稱和類名
 * @param param0.namespace - 命名空間
 * @param param0.pageFolder - 頁面文件夾路徑
 * @param param0.mockFolder - 模擬數據文件夾路徑
 * @param param0.templatesFolder - 模板文件的文件路徑
 * @param param0.enumStyle - 列舉樣式，可選 'string-literal' 或 'enum'
 */
export const generateService = async ({
  requestLibPath,
  schemaPath,
  pageFolder,
  mockFolder,
  ...rest
}: GenerateServiceProps) => {
  const openAPI = await getOpenAPIConfig(schemaPath as any)
  if (openAPI) {
    const requestImportStatement = getImportStatement(requestLibPath as any)
    const serviceGenerator = new ServiceGenerator(
      {
        namespace: 'API',
        requestImportStatement,
        enumStyle: 'string-literal',
        ...rest
      },
      openAPI
    )
    serviceGenerator.genFile()
  }
}
