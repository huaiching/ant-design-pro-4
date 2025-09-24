import { MliTable } from '@mli-csmo/base'
import { useEffect } from 'react'

type webProject = {
  name: string,
  description: string,
  deptCode: string,
  dept: string,
  owner: string
}

const webProjectList: webProject[] = [
  {
    name: 'aml-dashboard',
    description: 'AML系統 由三商美邦資訊部門開發，提供洗錢防制部報表查詢平台',
    deptCode: '90224',
    dept: '資訊架構科',
    owner: '陳凱尉'
  },
  {
    name: 'CRS_Web',
    description: '2021 CRS New WebProject',
    deptCode: '90224',
    dept: '資訊架構科',
    owner: '陳凱尉'
  },
  {
    name: 'DeveloperDashboard',
    description: '一個為開發者面向的 website，目前主要功能是專案清單列表，與整合各 Service Swagger UI URL',
    deptCode: '90224',
    dept: '資訊架構科',
    owner: '陳凱尉'
  },
  {
    name: 'Hamnashida',
    description: '一個為DevOps為面向優化行政作業流程的 website，目前主要功能是防火牆查詢、批次監控、憑證監控',
    deptCode: '90224',
    dept: '資訊架構科',
    owner: '陳凱尉'
  },
  {
    name: 'Integration Query',
    description: '整合查詢系統(保單管理系統平台優化)',
    deptCode: '90224',
    dept: '資訊架構科',
    owner: '陳凱尉'
  },
  {
    name: 'mliar',
    description: '壽險公會登錄系統外包專案',
    deptCode: '90214',
    dept: '業務資訊科',
    owner: '林朝源'
  },
  {
    name: 'newta',
    description: 'newTa 旅遊平安險前端畫面，博樂資訊開發，使用 JAVA + Angular',
    deptCode: '90224',
    dept: '資訊架構科',
    owner: '陳凱尉'
  },
  {
    name: 'Unpaid Web',
    description: '應付未付系統-前端網頁',
    deptCode: '90252',
    dept: '保全資訊二科	',
    owner: '吳瑞川'
  }
]

const Operation: React.FC = () => {
  const moduleName = 'demo.accessibility.keyboard'

  // Alt + s => 直接focus到名稱這個欄位
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault()
        const input = document.getElementById('name') as HTMLInputElement
        input?.focus()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // enter => 開始查詢
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const activeElement = document.activeElement

        if (activeElement && activeElement.tagName.toLowerCase() === 'button') {
          return
        }

        e.preventDefault()
        const button = Array.from(document.querySelectorAll('button')).find(btn => {
          const span = btn.querySelector('span')
          return span?.textContent?.trim() === '查 詢'
        })

        button?.click()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Alt + c => 清除搜尋欄位
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault()
        const button = Array.from(document.querySelectorAll('button')).find(btn => {
          const span = btn.querySelector('span')
          return span?.textContent?.trim() === '清 除'
        })

        button?.click()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const columns: any[] = [
    {
      moduleName,
      columnName: 'name'
    },
    {
      moduleName,
      columnName: 'description'
    },
    {
      moduleName,
      columnName: 'deptCode'
    },
    {
      moduleName,
      columnName: 'dept'
    },
    {
      moduleName,
      columnName: 'owner'
    }
  ]

  return (
    <MliTable
      manualRequest={false}
      moduleName={moduleName}
      columns={columns}
      scroll={{ x: 'max-content' }}
      rowKey='name'
      request={async (params) => {
        const {
          name,
          description,
          deptCode,
          dept,
          owner
        } = params

        const filtered = webProjectList.filter((item) => {

          return (
            (!name || item.name.includes(name)) &&
            (!description || item.description.includes(description)) &&
            (!deptCode || item.deptCode.includes(deptCode)) &&
            (!dept || item.dept.includes(dept)) &&
            (!owner || item.owner.includes(owner))
          )
        })

        return {
          data: filtered,
          success: true
        }
      }}
    >

    </MliTable>
  )
}

export default Operation