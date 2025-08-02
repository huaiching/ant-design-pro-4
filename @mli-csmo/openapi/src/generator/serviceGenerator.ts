import {existsSync, readFileSync} from 'fs'
import {join} from 'path'
import glob from 'glob'
import * as nunjucks from 'nunjucks'
import type {
  ContentObject,
  OpenAPIObject,
  OperationObject,
  ParameterObject,
  PathItemObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
  ResponsesObject,
  SchemaObject
} from 'openapi3-ts'
import ReservedDict from 'reserved-words'
import rimraf from 'rimraf'
import pinyin from 'tiny-pinyin'
import type {GenerateServiceProps} from '../index'
import Log from '../log'
import {stripDot, writeFile} from '../util'

const BASE_DIRS = ['service', 'services']

export type TypescriptFileType = 'interface' | 'serviceController' | 'serviceIndex'

export interface APIDataType extends OperationObject {
  path: string
  method: string
}

export type TagAPIDataType = Record<string, APIDataType[]>

export interface MappingItemType {
  antTechApi: string
  popAction: string
  popProduct: string
  antTechVersion: string
}

export interface ControllerType {
  fileName: string
  controllerName: string
}

export const getPath = () => {
  const cwd = process.cwd()
  return existsSync(join(cwd, 'src')) ? join(cwd, 'src') : cwd
}

// 類型宣告過濾關鍵字
const resolveTypeName = (typeName: string) => {
  if (ReservedDict.check(typeName)) {
    return `__openAPI__${typeName}`
  }
  const typeLastName = typeName?.split('/').pop()?.split('.').pop() || ''

  const name = typeLastName
    .replace(/[-_ ](\w)/g, (_all, letter) => letter.toUpperCase())
    .replace(/[^\w^\s^\u4e00-\u9fa5]/gi, '')

  if (!/[\u3220-\uFA29]/.test(name)) {
    return name
  }

  return pinyin.convertToPinyin(name, '', true)
}

function getRefName(refObject: any): string {
  if (typeof refObject !== 'object' || !refObject.$ref) {
    return refObject
  }
  const refPaths = refObject.$ref.split('/')
  return resolveTypeName(refPaths[refPaths.length - 1]) as string
}

const getType = (schemaObject: SchemaObject | undefined, namespace = ''): string => {
  if (schemaObject === undefined || schemaObject === null) {
    return 'any'
  }
  if (typeof schemaObject !== 'object') {
    return schemaObject
  }
  if (schemaObject.$ref) {
    return [namespace, getRefName(schemaObject)].filter((s) => s).join('.')
  }

  let { type } = schemaObject as any

  const numberEnum = [
    'int64',
    'integer',
    'long',
    'float',
    'double',
    'number',
    'int',
    'float',
    'double',
    'int32',
    'int64'
  ]

  const dateEnum = ['Date', 'date', 'dateTime', 'date-time', 'datetime']

  const stringEnum = ['string', 'email', 'password', 'url', 'byte', 'binary']

  if (schemaObject.format && numberEnum.includes(schemaObject.format)) {
    type = 'number'
  }

  if (schemaObject.enum) {
    type = 'enum'
  }

  if (numberEnum.includes(type)) {
    return 'number'
  }

  if (dateEnum.includes(type)) {
    return 'Date'
  }

  if (stringEnum.includes(type)) {
    return 'string'
  }

  if (type === 'boolean') {
    return 'boolean'
  }

  if (type === 'array') {
    let { items } = schemaObject
    if (schemaObject.schema) {
      items = schemaObject.schema.items
    }

    if (Array.isArray(items)) {
      const arrayItemType = (items as any)
        .map((subType) => getType(subType.schema || subType, namespace))
        .toString()
      return `[${arrayItemType}]`
    }
    const arrayType = getType(items, namespace)
    return arrayType.includes(' | ') ? `(${arrayType})[]` : `${arrayType}[]`
  }

  if (type === 'enum') {
    return Array.isArray(schemaObject.enum)
      ? Array.from(
          new Set(
            schemaObject.enum.map((v) =>
              typeof v === 'string' ? `"${v.replace(/"/g, '"')}"` : getType(v)
            )
          )
        ).join(' | ')
      : 'string'
  }

  if (schemaObject.oneOf && schemaObject.oneOf.length) {
    return schemaObject.oneOf.map((item) => getType(item, namespace)).join(' | ')
  }
  if (schemaObject.allOf && schemaObject.allOf.length) {
    return `(${schemaObject.allOf.map((item) => getType(item, namespace)).join(' & ')})`
  }
  if (schemaObject.type === 'object' || schemaObject.properties) {
    if (!Object.keys(schemaObject.properties || {}).length) {
      return 'Record<string, any>'
    }
    return `{ ${Object.keys(schemaObject.properties || {})
      .map((key) => {
        const required =
          'required' in (schemaObject?.properties?.[key] || {})
            ? ((schemaObject?.properties?.[key] || {}) as any).required
            : false
        /**
         * 將類型屬性變為字串，兼容錯誤格式如：
         * 3d_tile(數字開頭)等錯誤命名，
         * 在後面進行格式化的時候會將正確的字串轉換為正常形式，
         * 錯誤的繼續保留字串。
         * */
        return `'${key}'${required ? '' : '?'}: ${getType(
          schemaObject.properties && schemaObject.properties[key],
          namespace
        )}; `
      })
      .join('')}}`
  }
  return 'any'
}

export const getGenInfo = (isDirExist: boolean, appName: string, absSrcPath: string) => {
  // dir 不存在，則沒有佔用，且為第一次
  if (!isDirExist) {
    return [false, true]
  }
  const indexList = glob.sync(`@(${BASE_DIRS.join('|')})/${appName}/index.@(js|ts)`, {
    cwd: absSrcPath
  })
  // dir 存在，且 index 存在
  if (indexList && indexList.length) {
    const indexFile = join(absSrcPath, indexList[0])
    try {
      const line = (readFileSync(indexFile, 'utf-8') || '').split(/\r?\n/).slice(0, 3).join('')
      // dir 存在，index 存在， 且 index 是我們生成的。則未佔用，且不是第一次
      if (line.includes('// API 更新時間：')) {
        return [false, false]
      }
      // dir 存在，index 存在，且 index 內容不是我們生成的。此時如果 openAPI 子檔案存在，就不是第一次，否則是第一次
      return [true, !existsSync(join(indexFile, 'openAPI'))]
    } catch (_e) {
      // 因為 glob 已經拿到了這個檔案，但沒權限讀，所以當作 dirUsed, 在子目錄重新新建，所以當作 firstTime
      return [true, true]
    }
  }
  // dir 存在，index 不存在, 尋求，第一次要看 dir 下有沒有 openAPI 檔案夾
  return [
    true,
    !(
      existsSync(join(absSrcPath, BASE_DIRS[0], appName, 'openAPI')) ||
      existsSync(join(absSrcPath, BASE_DIRS[1], appName, 'openAPI'))
    )
  ]
}

const DEFAULT_SCHEMA: SchemaObject = {
  type: 'object',
  properties: { id: { type: 'number' } }
}

const DEFAULT_PATH_PARAM: ParameterObject = {
  in: 'path',
  name: '',
  schema: {
    type: 'string'
  },
  required: true,
  isObject: false,
  type: 'string'
}

class ServiceGenerator {
  protected apiData: TagAPIDataType = {}

  protected classNameList: ControllerType[] = []

  protected version: string

  protected mappings: MappingItemType[] = []

  protected finalPath: string

  protected config: GenerateServiceProps
  protected openAPIData: OpenAPIObject

  constructor(config: GenerateServiceProps, openAPIData: OpenAPIObject) {
    this.finalPath = ''
    this.config = {
      projectName: 'api',
      templatesFolder: join(__dirname, '../', 'templates'),
      ...config
    }
    this.openAPIData = openAPIData
    const { info } = openAPIData
    const basePath = ''
    this.version = info.version
    Object.keys(openAPIData.paths || {}).forEach((p) => {
      const pathItem: PathItemObject = openAPIData.paths[p]
      ;['get', 'put', 'post', 'delete', 'patch'].forEach((method) => {
        const operationObject: OperationObject = pathItem[method]
        if (!operationObject) {
          return
        }

        const tags = operationObject['x-swagger-router-controller']
          ? [operationObject['x-swagger-router-controller']]
          : operationObject.tags || [operationObject.operationId] || [
              p.replace('/', '').split('/')[1]
            ]

        tags.forEach((tagString) => {
          const tag = resolveTypeName(tagString)

          if (!this.apiData[tag]) {
            this.apiData[tag] = []
          }
          this.apiData[tag].push({
            path: `${basePath}${p}`,
            method,
            ...operationObject
          })
        })
      })
    })
  }

  public genFile() {
    const basePath = this.config.serversPath || './src/service'
    try {
      const finalPath = join(basePath, this.config.projectName || '')

      this.finalPath = finalPath
      glob
        .sync(`${finalPath}/**/*`)
        .filter((ele) => !ele.includes('_deperated'))
        .forEach((ele) => {
          rimraf.sync(ele)
        })
    } catch (error) {
      Log(`🚥 serves 生成失敗: ${error}`)
    }

    // 生成 ts 類型宣告
    const interfaceTP = this.getInterfaceTP()
    this.genFileFromTemplate('typings.ts', 'interface', {
      namespace: this.config.namespace,
      list: interfaceTP,
      disableTypeCheck: false
    })
    // 生成 controller 檔案
    const prettierError: any = []
    // 生成 service 統計
    const serviceTP = this.getServiceTP()
    serviceTP.forEach((tp) => {
      // 根據當前資料源類型選擇恰當的 controller 模版
      const template = 'serviceController'
      const hasError = this.genFileFromTemplate(
        this.getFinalFileName(`${tp.className}.ts`),
        template,
        {
          namespace: this.config.namespace,
          requestImportStatement: this.config.requestImportStatement,
          disableTypeCheck: false,
          ...tp
        }
      )
      if (hasError) {
        Log('🚥 格式化失敗', tp.className)
      }
      prettierError.push(hasError)
    })

    if (prettierError.includes(true)) {
      Log('🚥 格式化失敗，請檢查 service 檔案內可能存在的語法錯誤')
    }
    // 生成 index 檔案
    this.genFileFromTemplate('index.ts', 'serviceIndex', {
      list: this.classNameList,
      disableTypeCheck: false
    })

    // 打印日誌
    Log('✅ 成功生成 service 檔案')

    return { interfaceTP, serviceTP }
  }

  public concatOrNull = (...arrays) => {
    const filteredArrays = arrays.filter((arr): arr is any => Array.isArray(arr));
    const c = [].concat(...filteredArrays);
    return c.length > 0 ? c : null
  }

  public getParamsTypeName(operationObject: OperationObject) {
    const customeTypeName =
      this.config?.hook?.customTypeName || this.config?.hook?.customFunctionName

    return resolveTypeName(
      `${customeTypeName?.(operationObject) ?? operationObject.operationId}Params`
    )
  }

  public getFuncationName(data: APIDataType) {
    // 獲取路徑相同部分
    const pathBasePrefix = this.getBasePrefix(Object.keys(this.openAPIData.paths))
    return this.config.hook && this.config.hook.customFunctionName
      ? this.config.hook.customFunctionName(data)
      : data.operationId
      ? this.resolveFunctionName(stripDot(data.operationId), data.method)
      : data.method + this.genDefaultFunctionName(data.path, pathBasePrefix)
  }

  // 介面數據獲取
  public getServiceTP() {
    return Object.keys(this.apiData)
      .map((tag) => {
        // functionName tag 級別防重
        const tmpFunctionRD: Record<string, number> = {}
        const genParams = this.apiData[tag]
          .filter(
            (api) =>
              // 暫不支持變數 排除掉deprecated
              !api.path.includes('${') && !api.deprecated
          )
          .map((api) => {
            const newApi = api
            try {
              const allParams = this.getParamsTP(newApi.parameters, newApi.path)
              const body = this.getBodyTP(newApi.requestBody)
              const response = this.getResponseTP(newApi.responses)

              const params = allParams || {}
              const file = this.getFileTP(newApi.requestBody)

              let formData = false
              if ((body && (body.mediaType || '').includes('form')) || file) {
                formData = true
              }

              let functionName = this.getFuncationName(newApi)

              if (functionName && tmpFunctionRD[functionName]) {
                functionName = `${functionName}_${(tmpFunctionRD[functionName] += 1)}`
              } else if (functionName) {
                tmpFunctionRD[functionName] = 1
              }

              let formattedPath = newApi.path.replace(
                /:([^/]*)|{([^}]*)}/gi,
                (_, str, str2) => `$\{${str || str2}}`
              )
              if (newApi.extensions && newApi.extensions['x-antTech-description']) {
                const { extensions } = newApi
                const { apiName, antTechVersion, productCode, antTechApiName } =
                  extensions['x-antTech-description']
                formattedPath = antTechApiName || formattedPath
                this.mappings.push({
                  antTechApi: formattedPath,
                  popAction: apiName,
                  popProduct: productCode,
                  antTechVersion
                })
                newApi.antTechVersion = antTechVersion
              }

              // 為 path 中的 params 添加 alias
              const escapedPathParams = ((params || {}).path || []).map((ele, index) => ({
                ...ele,
                alias: `param${index}`
              }))
              if (escapedPathParams.length) {
                escapedPathParams.forEach((param) => {
                  formattedPath = formattedPath.replace(`$\{${param.name}}`, `$\{${param.alias}}`)
                })
              }

              const finalParams: any =
                escapedPathParams && escapedPathParams.length
                  ? { ...params, path: escapedPathParams }
                  : params

              // 處理 query 中的複雜物件
              if (finalParams && finalParams.query) {
                finalParams.query = finalParams.query.map((ele) => ({
                  ...ele,
                  isComplexType: ele.isObject
                }))
              }

              const getPrefixPath = () => {
                if (!this.config.apiPrefix) {
                  return formattedPath
                }
                // 靜態 apiPrefix
                const prefix =
                  typeof this.config.apiPrefix === 'function'
                    ? `${this.config.apiPrefix({
                        path: formattedPath,
                        method: newApi.method,
                        namespace: tag,
                        functionName
                      })}`.trim()
                    : this.config.apiPrefix.trim()

                if (!prefix) {
                  return formattedPath
                }

                if (prefix.startsWith("'") || prefix.startsWith('"') || prefix.startsWith('`')) {
                  const finalPrefix = prefix.slice(1, prefix.length - 1)
                  if (
                    formattedPath.startsWith(finalPrefix) ||
                    formattedPath.startsWith(`/${finalPrefix}`)
                  ) {
                    return formattedPath
                  }
                  return `${finalPrefix}${formattedPath}`
                }
                // prefix 變數
                return `${prefix}${formattedPath}`
              }

              return {
                ...newApi,
                // 對含有batch的介面特殊處理
                hasBatch: getPrefixPath().indexOf('/batch/') !== -1,
                functionName,
                typeName: this.getParamsTypeName(newApi),
                path: getPrefixPath(),
                pathInComment: formattedPath.replace(/\*/g, '&#42;'),
                hasPathVariables: formattedPath.includes('{'),
                hasApiPrefix: !!this.config.apiPrefix,
                method: newApi.method,
                // 如果 functionName 和 summary 相同，則不顯示 summary
                desc:
                  functionName === newApi.summary
                    ? newApi.description
                    : [newApi.summary, newApi.description].filter((s) => s).join(' '),
                hasHeader: !!(params && params.header) || !!(body && body.mediaType),
                params: finalParams,
                hasParams: Boolean(Object.keys(finalParams || {}).length),
                body,
                file,
                hasFormData: formData,
                response
              }
            } catch (error) {
              console.error('[GenSDK] gen service param error:', error)
              throw error
            }
          })
          .sort((a, b) => a.path.localeCompare(b.path))

        const fileName = this.replaceDot(tag)

        let className = fileName
        if (this.config.hook && this.config.hook.customClassName) {
          className = this.config.hook.customClassName(tag)
        }
        if (genParams.length) {
          this.classNameList.push({
            fileName: className,
            controllerName: className
          })
        }
        return {
          genType: 'ts',
          className,
          instanceName: `${fileName[0].toLowerCase()}${fileName.substr(1)}`,
          list: genParams
        }
      })
      .filter((ele) => !!ele.list.length)
  }

  public getBodyTP(requestBody: any = {}) {
    const reqBody: RequestBodyObject = this.resolveRefObject(requestBody)
    if (!reqBody) {
      return null
    }
    const reqContent: ContentObject = reqBody.content
    if (typeof reqContent !== 'object') {
      return null
    }
    let mediaType = Object.keys(reqContent)[0]

    const schema: SchemaObject = reqContent[mediaType].schema || DEFAULT_SCHEMA

    if (mediaType === '*/*') {
      mediaType = ''
    }
    // 如果 requestBody 有 required 屬性，則正常顯示；如果沒有，預設非必填
    const required = typeof requestBody.required === 'boolean' ? requestBody.required : false
    if (schema.type === 'object' && schema.properties) {
      const propertiesList = Object.keys(schema.properties)
        .map((p) => {
          if (
            schema.properties &&
            schema.properties[p] &&
            !['binary', 'base64'].includes((schema.properties[p] as SchemaObject).format || '') &&
            !(
              ['string[]', 'array'].includes((schema.properties[p] as SchemaObject).type || '') &&
              ['binary', 'base64'].includes(
                ((schema.properties[p] as SchemaObject).items as SchemaObject).format || ''
              )
            )
          ) {
            return {
              key: p,
              schema: {
                ...schema.properties[p],
                type: getType(schema.properties[p], this.config.namespace),
                required: schema.required?.includes(p) ?? false
              }
            }
          }
          return undefined
        })
        .filter((p) => p)
      return {
        mediaType,
        ...schema,
        required,
        propertiesList
      }
    }
    return {
      mediaType,
      required,
      type: getType(schema, this.config.namespace)
    }
  }

  public getFileTP(requestBody: any = {}) {
    if (requestBody && requestBody.content && requestBody.content['multipart/form-data']) {
      const ret = this.resolveFileTP(requestBody.content['multipart/form-data'].schema)
      return ret.length > 0 ? ret : null
    }
    return null
  }

  public resolveFileTP(obj: any) {
    let ret = []
    const resolved = this.resolveObject(obj)
    const props =
      (resolved.props &&
        resolved.props.length > 0 &&
        resolved.props[0].filter(
          (p) =>
            p.format === 'binary' ||
            p.format === 'base64' ||
            ((p.type === 'string[]' || p.type === 'array') &&
              (p.items.format === 'binary' || p.items.format === 'base64'))
        )) ||
      []
    if (props.length > 0) {
      ret = props.map((p) => {
        return {
          title: p.name,
          multiple: p.type === 'string[]' || p.type === 'array'
        }
      })
    }
    if (resolved.type) ret = [...ret, ...this.resolveFileTP(resolved.type)]
    return ret
  }

  public getResponseTP(responses: ResponsesObject = {}) {
    const response: ResponseObject | undefined =
      responses && this.resolveRefObject(responses.default || responses['200'])
    const defaultResponse = {
      mediaType: '*/*',
      type: 'any'
    }
    if (!response) {
      return defaultResponse
    }
    const resContent: ContentObject | undefined = response.content
    const mediaType = Object.keys(resContent || {})[0]
    if (typeof resContent !== 'object' || !mediaType) {
      return defaultResponse
    }
    const schema = resContent[mediaType].schema || DEFAULT_SCHEMA
    if ('properties' in schema) {
      Object.keys(schema.properties || {}).map((fieldName) => {
        // @ts-ignore
        schema.properties[fieldName]['required'] = schema.required?.includes(fieldName) ?? false
      })
    }
    return {
      mediaType,
      type: getType(schema, this.config.namespace)
    }
  }

  public getParamsTP(
    parameters: (ParameterObject | ReferenceObject)[] = [],
    path: string
  ): Record<string, ParameterObject[]> {
    const templateParams: Record<string, ParameterObject[]> = {}

    if (parameters && parameters.length) {
      ;['query', 'header', 'path', 'cookie' /* , 'file' */].forEach((source) => {
        const params = parameters
          .map((p) => this.resolveRefObject(p))
          .filter((p: ParameterObject) => p.in === source)
          .map((p) => {
            const isDirectObject = ((p.schema || {}).type || p.type) === 'object'
            const refList = ((p.schema || {}).$ref || p.$ref || '').split('/')
            const ref = refList[refList.length - 1]
            const deRefObj = (Object.entries(
              (this.openAPIData.components && this.openAPIData.components.schemas) || {}
            ).find(([k]) => k === ref) || []) as any
            const isRefObject = (deRefObj[1] || {}).type === 'object'
            return {
              ...p,
              isObject: isDirectObject || isRefObject,
              type: getType(p.schema || DEFAULT_SCHEMA, this.config.namespace)
            }
          })

        if (params.length) {
          templateParams[source] = params
        }
      })
    }

    if (path && path.length > 0) {
      const regex = /\{(\w+)\}/g
      templateParams.path = templateParams.path || []
      let match:any
      while ((match = regex.exec(path))) {
        const pathName = match[1]
        if (!templateParams.path.some((p) => p.name === pathName)) {
          templateParams.path.push({
            ...DEFAULT_PATH_PARAM,
            name: match[1]
          })
        }
      }

      // 如果 path 沒有內容，則將刪除 path 參數，避免影響後續的 hasParams 判斷
      if (!templateParams.path.length) delete templateParams.path
    }

    return templateParams
  }

  /**
   * ts 類型數據轉換
   */
  public getInterfaceTP() {
    const { components } = this.openAPIData
    const data =
      components &&
      [components.schemas].map((defines) => {
        if (!defines) {
          return null
        }

        return Object.keys(defines).map((typeName) => {
          const result = this.resolveObject(defines[typeName])

          const getDefinesType = () => {
            if (result.type) {
              return (defines[typeName] as SchemaObject).type === 'object' || result.type
            }
            return 'Record<string, any>'
          }
          return {
            typeName: resolveTypeName(typeName),
            type: getDefinesType(),
            parent: result.parent,
            props: result.props || [],
            isEnum: result.isEnum
          }
        })
      })

    // 強行替換掉請求參數params的類型，生成方法對應的 xxxxParams 類型
    Object.keys(this.openAPIData.paths || {}).forEach((p) => {
      const pathItem: PathItemObject = this.openAPIData.paths[p]
      ;['get', 'put', 'post', 'delete', 'patch'].forEach((method) => {
        const operationObject: OperationObject = pathItem[method]
        if (!operationObject) {
          return
        }

        const props: any = []
        if (operationObject.parameters) {
          operationObject.parameters.forEach((parameter: any) => {
            props.push({
              desc: parameter.description ?? '',
              name: parameter.name,
              required: parameter.required,
              type: getType(parameter.schema)
            })
          })
        }

        if (pathItem.parameters) {
          pathItem.parameters.forEach((parameter: any) => {
            props.push({
              desc: parameter.description ?? '',
              name: parameter.name,
              required: parameter.required,
              type: getType(parameter.schema)
            })
          })
        }

        if (props.length > 0 && data) {
          data.push([
            {
              typeName: `${this.getParamsTypeName({
                ...operationObject,
                method,
                path: p
              })}`,
              type: 'Record<string, any>',
              parent: undefined,
              props: [props],
              isEnum: false
            }
          ])
        }
      })
    })

    return (
      data &&
      // @ts-ignore
      data
        .reduce((p, c) => p && c && p.concat(c), [])
        .sort((a, b) => a.typeName.localeCompare(b.typeName))
    )
  }

  private genFileFromTemplate(
    fileName: string,
    type: TypescriptFileType,
    params: Record<string, any>
  ): boolean {
    try {
      const template = this.getTemplate(type)
      // 設置輸出不轉義
      nunjucks.configure({
        autoescape: false
      })
      return writeFile(this.finalPath, fileName, nunjucks.renderString(template, params))
    } catch (error) {
      console.error('[GenSDK] file gen fail:', fileName, 'type:', type)
      throw error
    }
  }

  private getTemplate(type: 'interface' | 'serviceController' | 'serviceIndex'): string {
    return readFileSync(join(this.config.templatesFolder || '', `${type}.njk`), 'utf8')
  }

  /**
   * 獲取 TS 類型的屬性列表
   */
  getProps(schemaObject: SchemaObject) {
    const requiredPropKeys = schemaObject?.required ?? false
    return schemaObject.properties
      ? Object.keys(schemaObject.properties).map((propName) => {
          const schema: SchemaObject =
            (schemaObject.properties && schemaObject.properties[propName]) || DEFAULT_SCHEMA
          return {
            ...schema,
            name: propName,
            type: getType(schema),
            desc: [schema.title, schema.description].filter((s) => s).join(' '),
            // 如果沒有 required 資訊，預設全部是非必填
            required: requiredPropKeys ? requiredPropKeys.some((key) => key === propName) : false
          }
        })
      : []
  }

  resolveObject(schemaObject: SchemaObject) {
    // 引用類型
    if (schemaObject.$ref) {
      return this.resolveRefObject(schemaObject)
    }
    // 枚舉類型
    if (schemaObject.enum) {
      return this.resolveEnumObject(schemaObject)
    }
    // 繼承類型
    if (schemaObject.allOf && schemaObject.allOf.length) {
      return this.resolveAllOfObject(schemaObject)
    }
    // 對象類型
    if (schemaObject.properties) {
      return this.resolveProperties(schemaObject)
    }
    // 陣列類型
    if (schemaObject.items && schemaObject.type === 'array') {
      return this.resolveArray(schemaObject)
    }
    return schemaObject
  }

  resolveArray(schemaObject: SchemaObject) {
    if (schemaObject.items?.$ref) {
      const refObj = schemaObject.items.$ref.split('/')
      return {
        type: `${refObj[refObj.length - 1]}[]`
      }
    }
    // TODO: 這裡需要解析出具體屬性，但由於 parser 層還不確定，所以暫時先返回 any
    return 'any[]'
  }

  resolveProperties(schemaObject: SchemaObject) {
    return {
      props: [this.getProps(schemaObject)]
    }
  }

  resolveEnumObject(schemaObject: SchemaObject) {
    const enumArray = schemaObject.enum

    let enumStr
    switch (this.config.enumStyle) {
      case 'enum':
        enumStr = `{${enumArray?.map((v) => `${v}="${v}"`).join(',')}}`
        break
      case 'string-literal':
        enumStr = Array.from(
          new Set(
            enumArray?.map((v) => (typeof v === 'string' ? `"${v.replace(/"/g, '"')}"` : getType(v)))
          )
        ).join(' | ')
        break
      default:
        break
    }

    return {
      isEnum: this.config.enumStyle == 'enum',
      type: Array.isArray(enumArray) ? enumStr : 'string'
    }
  }

  resolveAllOfObject(schemaObject: SchemaObject) {
    const props = (schemaObject.allOf || []).map((item) =>
      item.$ref ? [{ ...item, type: getType(item).split('/').pop() }] : this.getProps(item)
    )
    return { props }
  }

  /**
   * 將地址path路徑轉為大駝峰
   */
  private genDefaultFunctionName(path: string, pathBasePrefix: string) {
    // 首字母轉大寫
    function toUpperFirstLetter(text: string) {
      return text.charAt(0).toUpperCase() + text.slice(1)
    }

    return path
      ?.replace(pathBasePrefix, '')
      .split('/')
      .map((str) => {
        // 兼容錯誤命名如 /user/:id/:name 因為是typeName，所以直接進行轉換
        let s = resolveTypeName(str)
        if (s.includes('-')) {
          s = s.replace(/(-\w)+/g, (_match: string, p1) => p1?.slice(1).toUpperCase())
        }

        if (s.match(/^{.+}$/gim)) {
          return `By${toUpperFirstLetter(s.slice(1, s.length - 1))}`
        }
        return toUpperFirstLetter(s)
      })
      .join('')
  }

  /**
   * 檢測所有path重複區域（prefix）
   */
  private getBasePrefix(paths: string[]) {
    const arr: any = []
    paths
      .map((item) => item.split('/'))
      .forEach((pathItem) => {
        pathItem.forEach((item, key) => {
          if (arr.length <= key) {
            arr[key] = []
          }
          arr[key].push(item)
        })
      })

    const res:any = []
    arr
      .map((item) => Array.from(new Set(item)))
      .every((item) => {
        const b = item.length === 1
        if (b) {
          res.push(item)
        }
        return b
      })

    return `${res.join('/')}/`
  }

  private resolveRefObject(refObject: any): any {
    if (!refObject || !refObject.$ref) {
      return refObject
    }
    const refPaths = refObject.$ref.split('/')
    if (refPaths[0] === '#') {
      refPaths.shift()
      let obj: any = this.openAPIData
      refPaths.forEach((node: any) => {
        obj = obj[node]
      })
      if (!obj) {
        throw new Error(`[GenSDK] Data Error! Notfoud: ${refObject.$ref}`)
      }
      return {
        ...this.resolveRefObject(obj),
        type: obj.$ref ? this.resolveRefObject(obj).type : obj
      }
    }
    return refObject
  }

  private getFinalFileName(s: string): string {
    // 支援下劃線、中劃線和空格分隔符，注意分隔符列舉值的順序不能改變，否則正則匹配會報錯
    return s.replace(/[-_ ](\w)/g, (_all, letter) => letter.toUpperCase())
  }

  private replaceDot(s: string) {
    return s.replace(/\./g, '_').replace(/[-_ ](\w)/g, (_all, letter) => letter.toUpperCase())
  }

  private resolveFunctionName(functionName: string, methodName) {
    // 類型宣告過濾關鍵字
    if (ReservedDict.check(functionName)) {
      return `${functionName}Using${methodName.toUpperCase()}`
    }
    return functionName
  }
}

export { ServiceGenerator }
