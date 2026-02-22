import { MliFormCol, MliFormRow } from '@mli-csmo/base'
import { ProCard } from '@ant-design/pro-components'
import { Button, Card, Space } from 'antd'
import { useMemo } from 'react'

/** 單一標籤設定 */
export interface TagChildConfig {
  key: string
  title: string
  color : string
  /** 用來過濾 dataSource 的條件，不傳則視為「全部」 */
  filter?: (item: any) => boolean
}

/** 標籤群組設定 */
export interface TagGroupConfig {
  key: string
  title: string
  children: TagChildConfig[]
}

/** 元件 Props */
interface SearchTagCardProps {
  /** 標籤群組設定（靜態常數，定義在元件外層即可） */
  tagGroups: TagGroupConfig[]
  /** 資料來源，用於計算各標籤數量與篩選 */
  dataSource: any[]
  /** 目前選中的標籤 key 清單 */
  selectedKeys: string[]
  /** 標籤點擊後的回調，回傳最新選中的 key 清單 */
  onChange: (keys: string[]) => void
  /** 是否允許多選，預設 false（單選） */
  multiple?: boolean
}

const SearchTagCard: React.FC<SearchTagCardProps> = ({
  tagGroups,
  dataSource,
  selectedKeys,
  onChange,
  multiple = false
}) => {
  // 根據 dataSource 動態計算各標籤的數量
  // 有 filter 條件 → 過濾後計算；無 filter → 視為全部，直接取總筆數
  const tagGroupsWithCount = useMemo(() =>
    tagGroups.map((group) => ({
      ...group,
      children: group.children.map((child) => ({
        ...child,
        count: child.filter
          ? dataSource.filter(child.filter).length
          : dataSource.length
      }))
    }))
  , [tagGroups, dataSource])

  // 標籤點擊處理
  // 單選：點已選的 → 取消；點未選的 → 選取（清除其他）
  // 多選：點已選的 → 取消；點未選的 → 加入選取
  const handleClick = (key: string) => {
    const isSelected = selectedKeys.includes(key)
    if (multiple) {
      onChange(isSelected ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key])
    } else {
      onChange(isSelected ? [] : [key])
    }
  }

  return (
    <ProCard ghost>
      <MliFormRow gutter={8} style={{ width: '100%' }}>
        {tagGroupsWithCount.map((group) => (
          // colSize 依群組數量均分欄位寬度
          <MliFormCol key={group.key} colSize={4 / tagGroupsWithCount.length}>
            <Card
              title={<span style={{ fontSize: 18 }}>{group.title}</span>}
              type="inner"
              style={{ textAlign: 'center', height: '100%' }}
            >
              <Space wrap>
                {group.children.map((child) => {
                  const isSelected = selectedKeys.includes(child.key)
                  return (
                    <Button
                      key={child.key}
                      // 選中 → primary（實色）；未選中 → text（淡色背景）
                      type={isSelected ? 'primary' : 'text'}
                      style={{
                        // 選中 → 原色；未選中 → 透明度 0.1 的淡色
                        backgroundColor: isSelected
                          ? child.color 
                          : child.color .replace('1)', '0.1)')
                      }}
                      onClick={() => handleClick(child.key)}
                    >
                      {child.title} ({child.count})
                    </Button>
                  )
                })}
              </Space>
            </Card>
          </MliFormCol>
        ))}
      </MliFormRow>
    </ProCard>
  )
}

export default SearchTagCard