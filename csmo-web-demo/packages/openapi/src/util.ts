import path from 'path'
import fs from 'fs'
import * as prettier from 'prettier'
import { camelCase, upperFirst } from 'lodash'

// const { prettier: defaultPrettierOptions } = require('@umijs/fabric')

export const getAbsolutePath = (filePath: string) => {
  if (filePath && !path.isAbsolute(filePath)) {
    return path.join(process.cwd(), filePath)
  }
  return filePath
}

export const mkdir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    mkdir(path.dirname(dir))
    fs.mkdirSync(dir)
  }
}

export const prettierFile = (content: string): [string, boolean] => {
  let result = content
  let hasError = false
  try {
    result = prettier.format(content, {
      // ...defaultPrettierOptions,
      semi: false,
      trailingComma: 'none',
      singleQuote: true,
      printWidth: 100,
      parser: 'typescript'
    })
  } catch (_error: any) {
    hasError = true
  }
  return [result, hasError]
}

export const writeFile = (folderPath: string, fileName: string, content: string) => {
  const filePath = path.join(folderPath, fileName)
  mkdir(path.dirname(filePath))
  const [prettierContent, hasError] = prettierFile(content)
  fs.writeFileSync(filePath, prettierContent, {
    encoding: 'utf8'
  })
  return hasError
}

export const getTagName = (name: string) => {
  const result = name.split('.')
  // 資料源中的 tag 等同於全量的 op API 名，確定為 4-5 段，如上格式 取中間的 1-2 段作為 tag，作為 serviceController 創建目錄的依據
  if (result.length === 4) {
    return result[2]
  }
  if (result.length === 5) {
    return result[2] + upperFirst(result[3])
  }
  return name
}

/**
 * 根據當前的資料源類型，對請求回來的 apiInfo 進行格式化
 * 如果是 op 資料源，對 tags 以及 path 中的 tags 進行處理
 * - before: 前綴（產品集.產品碼） + 操作對象（必填）+ 子操作對象（可選）+ 動作（必填）
 * - after: 操作對象（必填）+ 子操作對象（可選） ==> 駝峰
 */
export const formatApiInfo = (apiInfo: Record<string, any>): any => {
  if (
    !(
      apiInfo &&
      apiInfo.schema.info &&
      apiInfo.schema.info.extensions &&
      apiInfo.schema.info.extensions['x-antTech-description']
    )
  ) {
    // 非 OP 資料源，直接返回
    return apiInfo
  }

  apiInfo.schema.tags = apiInfo.schema.tags.map((item: Record<string, string>) => {
    return {
      ...item,
      name: getTagName(item.name)
    }
  })

  for (const childPath in apiInfo.schema.paths) {
    apiInfo.schema.paths[childPath].post.tags = apiInfo.schema.paths[childPath].post.tags.map(
      (tag: string) => getTagName(tag)
    )
  }

  return apiInfo
}

type serviceParam = {
  title: string
  type: string
  description: string
  default: string
  [key: string]: any
}

type serviceParams = Record<string, serviceParam>

/**
 * 一方化場景下，由於 onex 會對請求的響應做處理
 *  1. 將 Response & Request 中的參數字段會變更為小駝峰寫法
 *  2. 另外要注意：
 *  op 返回的數據，請求參數的類型格式 需要做額外的處理
 *  - (name) key.n, (type) string  ==> key: string []
 *  - (name) key.m,  (type) string ===>  key: string []
 *  - (name) key.key1 , (type) string ==> key: {key1:string}
 *  - (name) key.n.key1 ,(type) string => key:{ key1 :string}[]
 *  - (name) key.n.key1.m,(type) string ==> key:{key1: string[]}[]
 */
export function formatParamsForYFH(
  params: serviceParams,
  paramsObject: serviceParams = {}
): serviceParams {
  Object.keys(params).forEach((name) => {
    const prop = params[name]
    let key = name
    const nameList = name.split('.')
    const nameListLength = nameList.length

    if (nameListLength === 1) {
      // 正常的 key
      paramsObject[key] = { ...prop }
    } else if (nameListLength === 2 && nameList[1] !== 'n' && nameList[1] !== 'm') {
      const [childKey] = nameList
      const keyChildKey = camelCase(nameList[1])
      paramsObject[childKey] = combineParams(childKey, keyChildKey, prop, paramsObject)
    } else {
      if (nameList[nameListLength - 2] === 'n' || nameList[nameListLength - 2] === 'm') {
        const childKey = camelCase(nameList.pop())
        nameList.pop()
        key = nameList.join('.')
        paramsObject[key] = combineParams(key, childKey, prop, paramsObject, '.n.key')
      } else {
        const childKey = camelCase(nameList.pop())
        key = nameList.join('.')

        if (childKey === 'n' || childKey === 'm') {
          if (nameList[nameList.length - 2] === 'n' || nameList[nameList.length - 2] === 'm') {
            const childChildKey = camelCase(nameList.pop())
            nameList.pop()
            key = nameList.join('.')
            paramsObject[key] = combineParams(key, childChildKey, prop, paramsObject, '.n.key.m')
          } else {
            prop.type = `${prop.type}[]`
            paramsObject[key] = { ...prop }
          }
        } else {
          paramsObject[key] = combineParams(key, childKey, prop, paramsObject)
        }
      }
    }

    paramsObject[key].name = camelCase(key)
  })

  const hasInvoke = Object.keys(paramsObject).filter((param) => param.includes('.')).length > 0

  if (hasInvoke) {
    // 遞歸
    return formatParamsForYFH(paramsObject)
  }
  return paramsObject
}

function combineParams(
  key: string,
  childKey: string,
  prop: serviceParam,
  paramsObject: serviceParams,
  type?: string
): serviceParam {
  const typeSuffix = type === '.n.key.m' ? '[]' : ''
  const keySuffix = type === '.n.key' || type === '.n.key.m' ? '[]' : ''
  if (paramsObject[key]) {
    const childType = `{${childKey}:${prop.type}${typeSuffix}, ${paramsObject[key].type.slice(1)}`
    paramsObject[key] = {
      ...paramsObject[key],
      type: childType
    }
  } else {
    paramsObject[key] = {
      ...prop,
      type: `{${childKey}:${prop.type}
      }${keySuffix}`
    }
  }

  return paramsObject[key]
}

export const stripDot = (str: string) => {
  return str.replace(/[-_ .](\w)/g, (_all, letter) => letter.toUpperCase())
}
