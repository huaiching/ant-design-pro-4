import { PageContainer } from '@ant-design/pro-components'
import { Alert, Card, Col, Input, message, Row, Tooltip } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { useRef, useState } from 'react'

const MliIcon: React.FC = () => {
  const iconInfoReference = useRef(null)

  const [messageApi, contextHolder] = message.useMessage()
  const iconList = [
    'iconfont icon-Reoutput-doc',
    'iconfont icon-download-report',
    'iconfont icon-output-document',
    'iconfont icon-write-off',
    'iconfont icon-rename',
    'iconfont icon-recalculate',
    'iconfont icon-not-allowed',
    'iconfont icon-confirmation-claims',
    'iconfont icon-submit-for-review',
    'iconfont icon-recommender',
    'iconfont icon-add-version',
    'iconfont icon-modify-product',
    'iconfont icon-new-product',
    'iconfont icon-product-upgrade',
    'iconfont icon-progress-details',
    'iconfont icon-claims',
    'iconfont icon-finish-material',
    'iconfont icon-notice-material',
    'iconfont icon-add-material',
    'iconfont icon-confirm-state',
    'iconfont icon-close2',
    'iconfont icon-minus2',
    'iconfont icon-minus1',
    'iconfont icon-add2',
    'iconfont icon-tag',
    'iconfont icon-Notice',
    'iconfont icon-add1',
    'iconfont icon-close1',
    'iconfont icon-warning',
    'iconfont icon-verify',
    'iconfont icon-Examiner',
    'iconfont icon-competition_two',
    'iconfont icon-AG',
    'iconfont icon-Bancassurance',
    'iconfont icon-finance',
    'iconfont icon-void',
    'iconfont icon-login-file-download',
    'iconfont icon-reply-file-upload',
    'iconfont icon-reply-file-download',
    'iconfont icon-correction',
    'iconfont icon-reply-mark',
    'iconfont icon-upload-mark',
    'iconfont icon-left',
    'iconfont icon-right',
    'iconfont icon-up',
    'iconfont icon-down',
    'iconfont icon-discount',
    'iconfont icon-ratio-change',
    'iconfont icon-training-confirmation',
    'iconfont icon-clear-data',
    'iconfont icon-attendance-maintenance',
    'iconfont icon-staff-maintenance',
    'iconfont icon-implement',
    'iconfont icon-premit-completed',
    'iconfont icon-new-version',
    'iconfont icon-retrieve',
    'iconfont icon-attendance-detail',
    'iconfont icon-application-maintenance',
    'iconfont icon-qualified-maintenance',
    'iconfont icon-subsidy',
    'iconfont icon-submit-department',
    'iconfont icon-diplomatic-note',
    'iconfont icon-sign-off',
    'iconfont icon-competition',
    'iconfont icon-folder-two',
    'iconfont icon-official',
    'iconfont icon-official-trailer',
    'iconfont icon-manage',
    'iconfont icon-performance',
    'iconfont icon-reserve',
    'iconfont icon-admin',
    'iconfont icon-remove-batch',
    'iconfont icon-add-batch',
    'iconfont icon-batch',
    'iconfont icon-contract',
    'iconfont icon-exam',
    'iconfont icon-transfer',
    'iconfont icon-renzizhuanyi',
    'iconfont icon-health-insurance',
    'iconfont icon-profile',
    'iconfont icon-ticket',
    'iconfont icon-start',
    'iconfont icon-pause',
    'iconfont icon-submit-document',
    'iconfont icon-download',
    'iconfont icon-back',
    'iconfont icon-approve-upload',
    'iconfont icon-folder-upload',
    'iconfont icon-premit',
    'iconfont icon-reset-password',
    'iconfont icon-attendance',
    'iconfont icon-excel',
    'iconfont icon-ppt',
    'iconfont icon-txt',
    'iconfont icon-word',
    'iconfont icon-zip',
    'iconfont icon-pdf',
    'iconfont icon-pic',
    'iconfont icon-export',
    'iconfont icon-print-payment',
    'iconfont icon-admission-ticket',
    'iconfont icon-arrow-up',
    'iconfont icon-arrow-down',
    'iconfont icon-student-management',
    'iconfont icon-expand',
    'iconfont icon-training-closed',
    'iconfont icon-change-record',
    'iconfont icon-calendar',
    'iconfont icon-edit-template',
    'iconfont icon-link',
    'iconfont icon-avatar',
    'iconfont icon-history-record',
    'iconfont icon-setting-config',
    'iconfont icon-remind',
    'iconfont icon-power',
    'iconfont icon-delete',
    'iconfont icon-email',
    'iconfont icon-more-two',
    'iconfont icon-communication',
    'iconfont icon-organization',
    'iconfont icon-search',
    'iconfont icon-more-one',
    'iconfont icon-add-staff',
    'iconfont icon-remove-staff',
    'iconfont icon-setting',
    'iconfont icon-home',
    'iconfont icon-user',
    'iconfont icon-help',
    'iconfont icon-rotate-left',
    'iconfont icon-reissue-certificate',
    'iconfont icon-rotate-right',
    'iconfont icon-preview-open-one',
    'iconfont icon-preview-close',
    'iconfont icon-folder',
    'iconfont icon-zoom-out',
    'iconfont icon-zoom-in',
    'iconfont icon-data',
    'iconfont icon-lesson-information',
    'iconfont icon-team',
    'iconfont icon-check-reason',
    'iconfont icon-reconsideration',
    'iconfont icon-refund',
    'iconfont icon-audit',
    'iconfont icon-save',
    'iconfont icon-change-test-area',
    'iconfont icon-cancel-application',
    'iconfont icon-apply',
    'iconfont icon-post',
    'iconfont icon-share',
    'iconfont icon-print',
    'iconfont icon-accept',
    'iconfont icon-detail',
    'iconfont icon-more-three',
    'iconfont icon-privilege',
    'iconfont icon-edit-profile',
    'iconfont icon-update',
    'iconfont icon-edit-staff',
    'iconfont icon-sort',
    'iconfont icon-commission',
    'iconfont icon-personnel',
    'iconfont icon-qos',
    'iconfont icon-training',
    'iconfont icon-marketing'
  ]

  const [searchIcon, setSearchIcon] = useState('')
  const filteredIcons = iconList.filter(icon =>
    icon.toLowerCase().includes(searchIcon.toLowerCase())
  )

  /**
   * 複製icon的名稱
   * @param e 點擊的DOM
   * @returns DOM的數值
   */
  const copyIcon = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLElement
    const range = document.createRange()

    window.getSelection()?.removeAllRanges()

    if (target.innerText.indexOf('...') !== -1) {
      return
    } else {
      range.selectNode(target)
    }

    window.getSelection()?.addRange(range)
    const successful = document.execCommand('copy')

    if (successful) {
      messageApi.success('複製成功')
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      copyIcon(e as any)
    }
  }

  return (
    <PageContainer>
      {contextHolder}

      <Alert
        type="info"
        message='說明'
        description={
          <Paragraph>
            Mli 專屬的icon，放在app-common下
            <br />
            點選文字可以複製
          </Paragraph>
        }
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Input.Search
        placeholder="搜尋 icon 名稱"
        allowClear
        onChange={(e) => setSearchIcon(e.target.value)}
        style={{ marginBottom: 24, maxWidth: 400 }}
      />

      <div style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          {filteredIcons.map((iconName) => (
            <Col xs={8} sm={6} md={4} lg={3} key={iconName}>
              <Card hoverable style={{ textAlign: 'center' }}>
                <Tooltip title={iconName}>
                  <span
                    ref={iconInfoReference}
                    className={`${iconName}`}
                    style={{ fontSize: 32, display: 'block', marginBottom: 8 }}
                  />
                </Tooltip>
                <div
                  role='button'
                  tabIndex={0}
                  style={{ fontSize: 12 }}
                  onClick={copyIcon}
                  onKeyDown={handleKeyDown}
                >{iconName}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageContainer>
  )
}

export default MliIcon