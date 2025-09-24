import { PageContainer, ProCard, ProFormField, ProFormRadio } from '@ant-design/pro-components';
import { EditableMliTable } from '@mli-csmo/base'
import { useState } from 'react'

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
}

const EditableTableMli: React.FC = () => {
  const moduleName = 'demo.editabletable'
  const waitTime = (time: number = 100) => {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, time)
    })
  }
  const defaultData: DataSourceType[] = [
    {
      id: 624748504,
      title: '活動名稱一',
      readonly: '活動名稱一',
      decs: '這個活動真好玩',
      state: 'open',
      created_at: 1590486176000,
      update_at: 1590486176000
    },
    {
      id: 624691229,
      title: '活動名稱二',
      readonly: '活動名稱二',
      decs: '這個活動真好玩',
      state: 'closed',
      created_at: 1590481162000,
      update_at: 1590481162000
    }
  ]
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([])
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'bottom'
  )

  const columns: any[] = [
    {
      title: '活動名稱',
      moduleName,
      columnName: 'title',
      dataIndex: 'title',
      hideInSearch: true,
      tooltip: '只讀取, 使用form.getFieldValue得不到值',
      formItemProps: (form, rowIndex: number) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '必填寫' }] : []
        }
      },
      editable: (index: number) => {
        return index !== 0
      },
      width: '15%',
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      title: '活動名稱二',
      moduleName,
      columnName: 'readonly',
      dataIndex: 'readonly',
      hideInSearch: true,
      tooltip: '只讀取, 使用form.getFieldValue可以取得值',
      readonly: true,
      width: '15%',
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      title: '狀態',
      moduleName,
      columnName: 'state',
      hideInSearch: true,
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解決',
          status: 'Error'
        },
        closed: {
          text: '已解決',
          status: 'Success'
        }
      },
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      title: '描述',
      dataIndex: 'decs',
      moduleName,
      columnName: 'decs',
      hideInSearch: true,
      fieldProps: (form: any, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey ?? '', 'title']) === '不好玩') {
          return {
            disabled: true
          }
        }
        if (rowIndex > 9) {
          return {
            disabled: true
          }
        }
        return {}
      },
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      title: '活動時間',
      dataIndex: 'created_at',
      moduleName,
      columnName: 'created_at',
      hideInSearch: true,
      valueType: 'date',
      fieldProps: {
        format: 'TTT/MM/DD'
      },
      render: (text: any) => {
        return text?.props?.children
      }
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id)
          }}
        >
          編輯
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id))
          }}
        >
          刪除
        </a>
      ]
    }
  ]

  return (
    <PageContainer>
      <EditableMliTable<DataSourceType>
        moduleName={moduleName}
        rowKey="id"
        search={undefined}
        maxLength={5}
        scroll={{
          x: 960
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
              position: position as 'top',
              record: () => ({ id: (Math.random() * 1000000).toFixed(0) })
            }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value)
            }}
            options={[
              {
                label: '加在Top',
                value: 'top'
              },
              {
                label: '加在Bottom',
                value: 'bottom'
              },
              {
                label: '隱藏',
                value: 'hidden'
              }
            ]}
          />
        ]}
        columns={columns}
        request={async () => {
          return {
            data: defaultData,
            success: true,
            total: 3
          }
        }}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            await waitTime(2000)
          },
          onChange: setEditableRowKeys
        }}
      />
      <ProCard title="表格數據"
        headerBordered
        collapsible
        defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%'
            }
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </PageContainer>
  )
}

export default EditableTableMli