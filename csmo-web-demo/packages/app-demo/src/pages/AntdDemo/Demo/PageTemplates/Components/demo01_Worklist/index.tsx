import React, { useState } from 'react'
import { Row, Col } from 'antd'
import CaseList from './Components/CaseList'
import CaseDetail from './Components/CaseDetail'

const IndexPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  return (
    <Row gutter={16}>
      <Col span={6}>
        <CaseList onSelectType={(type) => setSelectedType(type)} selectedType={selectedType} />
      </Col>
      <Col span={18}>
        {selectedType && (
          <CaseDetail caseType={selectedType} />
        )}
      </Col>
    </Row>
  )
}

export default IndexPage
