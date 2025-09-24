import { ProFormInstance } from '@ant-design/pro-components'
import { MliTable } from '@mli-csmo/base'
import { Button, Tooltip } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useRef, useState } from 'react'
import { history, useIntl } from 'umi'

type dateTableType = {
  name: string,
  prodYmFrom: Dayjs | undefined,
  prodYmTo: Dayjs | undefined,
  taxYearFrom: Dayjs | undefined,
  taxYearTo: Dayjs | undefined
}

const dateTableList: dateTableType[] = [
  {
    name: '測試一',
    prodYmFrom: dayjs('2024-01'),
    prodYmTo: dayjs('2024-12'),
    taxYearFrom: dayjs('2024'),
    taxYearTo: dayjs('2025')
  },
  {
    name: '測試二',
    prodYmFrom: dayjs('2025-01'),
    prodYmTo: dayjs('2025-07'),
    taxYearFrom: dayjs('2023'),
    taxYearTo: dayjs('2025')
  },
  {
    name: '測試三',
    prodYmFrom: dayjs('2023-01'),
    prodYmTo: dayjs('2023-12'),
    taxYearFrom: dayjs('2022'),
    taxYearTo: dayjs('2024')
  }
]

const DateView: React.FC = () => {
  const { formatMessage } = useIntl()
  const formRef = useRef<ProFormInstance>()
  const [prodYmTo, setProdYmTo] = useState<Dayjs | undefined>()
  const [prodYmFrom, setProdYmFrom] = useState<Dayjs | undefined>()
  const [taxYearFrom, setTaxYearFrom] = useState<Dayjs | undefined>()
  const [taxYearTo, setTaxYearTo] = useState<Dayjs | undefined>()

  const moduleName = 'demo.dateTable'

  const columns: any[] = [
    {
      moduleName: moduleName,
      columnName: 'name',
      valueType: 'text'
    },
    {
      moduleName: moduleName,
      columnName: 'prodYmFrom',
      valueType: 'dateMonth',
      fieldProps: {
        format: formatMessage({ id: 'common.month' }),
        onChange: (value: any) => {
          setProdYmFrom(value)
          if (!prodYmTo) {
            formRef.current?.setFieldsValue({
              prodYmTo: value
            })
          }
        },
        disabledDate: (current: any) => {
          return prodYmTo ? current > prodYmTo || current > dayjs() : current > dayjs()
        }
      }
    },
    {
      moduleName: moduleName,
      columnName: 'prodYmTo',
      valueType: 'dateMonth',
      fieldProps: {
        format: formatMessage({ id: 'common.month' }),
        onChange: (value: any) => {
          setProdYmTo(value)
        },
        disabledDate: (current: any) => {
          return prodYmFrom ? current < prodYmFrom || current > dayjs() : current > dayjs()
        }
      }
    },
    {
      moduleName: moduleName,
      columnName: 'taxYearFrom',
      valueType: 'dateYear',
      fieldProps: {
        format: formatMessage({ id: 'common.year' }),
        onChange: (value: any) => {
          setTaxYearFrom(value)
          if (!taxYearTo) {
            formRef.current?.setFieldsValue({
              taxYearTo: value
            })
          }
        },
        disabledDate: (current: any) => {
          return taxYearTo ? current > taxYearTo || current > dayjs() : current > dayjs()
        }
      }
    },
    {
      moduleName: moduleName,
      columnName: 'taxYearTo',
      valueType: 'dateYear',
      fieldProps: {
        format: formatMessage({ id: 'common.year' }),
        onChange: (value: any) => {
          setTaxYearTo(value)
        },
        disabledDate: (current: any) => {
          return taxYearFrom ? current < taxYearFrom : current > dayjs()
        }
      }
    },
    {
      title: formatMessage({ id: 'common.table.header.action' }),
      valueType: 'option',
      fixed: 'right',
      render: (text, record) => {
        return (
          <>
            {
              <Tooltip title={formatMessage({ id: 'dateTable.button.edit' })}>
                <Button
                  type="link"
                  onClick={() =>
                    history.push('/table/date/hello')
                  }
                >
                  <i className="iconfont icon-edit-staff" />
                </Button>
              </Tooltip>
            }
          </>
        )
      }
    }
  ]
  return (
    <MliTable
      // 設定Table是否手動更新，由SearchStore的reloadByManual控制
      // manualRequest={ifSessionExisted(moduleName)}
      moduleName={moduleName}
      columns={columns}
      scroll={{ x: 'max-content' }}
      rowKey='name'
      request={async (params) => {
        const {
          name,
          prodYmFrom,
          prodYmTo,
          taxYearFrom,
          taxYearTo
        } = params

        const filtered = dateTableList.filter((item) => {

          return (
            (!name || item.name.includes(name)) &&
            (!prodYmFrom || item?.prodYmFrom?.isSame(prodYmFrom, 'month')) &&
            (!prodYmTo || item.prodYmTo?.isSame(prodYmTo, 'month')) &&
            (!taxYearFrom || item.taxYearFrom?.isSame(taxYearFrom, 'year')) &&
            (!taxYearTo || item.taxYearTo?.isSame(taxYearTo, 'year'))
          )
        })

        return {
          data: filtered,
          success: true
        }

      }}
    />
  )
}

export default DateView