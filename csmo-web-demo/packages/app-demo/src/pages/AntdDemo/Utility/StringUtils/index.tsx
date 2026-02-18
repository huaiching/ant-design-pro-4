import CodeTsx from '@/utils/CodePre/CodeTsx'
import { alnumProps, fullWidthProps, halfWidthProps, numProps, toUpperProps } from '@/utils/FieldUtil/StringUtil'
import { PageContainer, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components'
import { MliFormRow } from '@mli-csmo/base'
import { Table, Typography } from 'antd'
import { useRef } from 'react'

const DateUtile: React.FC = () => {
  const { Title, Paragraph } = Typography
  const formRef = useRef<ProFormInstance>()

  return (
    <PageContainer title={false}>
      <ProForm grid layout="vertical" formRef={formRef} submitter={false}>
        <Typography style={{ width: '100%' }}>
          <Title level={3}>字串 工具</Title>
          <Paragraph>
            此工具為 <code>字串</code> 的 相關工具，提供 <code>全形半形轉換</code>、<code>僅英文數字</code>、<code>僅數字</code> 等相關工具。<br />
            使用時，可直接於 Antd 相關元件中，使用 <code>fieldProps 引用方法</code>。
          </Paragraph>
          <Title level={5}>轉換方法</Title>
          <Table
            size="small"
            bordered
            columns={[
              { title: '方法', dataIndex: 'name', width: 300 },
              { title: '函式', dataIndex: 'method' }
            ]}
            dataSource={[
              { name: '半形轉換', method: 'toHalfWidth' },
              { name: '全形轉換', method: 'toFullWidth' },
              { name: '保留英文與數字', method: 'onlyAlnum' },
              { name: '保留數字', method: 'onlyNum' },
              { name: '文字轉大寫', method: 'toUpper' },
            ]}
            pagination={false}
          />
          <Title level={5}>fieldProps 引用方法</Title>
          <Table
            size="small"
            bordered
            columns={[
              { title: '方法', dataIndex: 'name', width: 300 },
              { title: '函式', dataIndex: 'method' }
            ]}
            dataSource={[
              { name: '半形轉換 fieldProps', method: 'halfWidthProps' },
              { name: '全形轉換 fieldProps', method: 'fullWidthProps' },
              { name: '保留英文與數字 fieldProps', method: 'alnumProps' },
              { name: '保留英文與數字（大寫）fieldProps', method: 'alnumUpperProps' },
              { name: '保留數字 fieldProps', method: 'numProps' },
              { name: '文字轉大寫 fieldProps', method: 'toUpperProps' },
            ]}
            pagination={false}
          />

          <details>
            <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>工具程式碼</summary>
            <CodeTsx
              title='StringUtil.ts'
              code={`/**
 * 半形轉換
 */
export const toHalfWidth = (str: string): string => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 0xFF01 && charCode <= 0xFF5E) {
      result += String.fromCharCode(charCode - 0xFEE0);
    } else if (charCode === 0x3000) {
      // 全形空格轉半形
      result += ' ';
    } else {
      result += str[i];
    }
  }
  return result;
}

/**
 * 全形轉換
 */
export const toFullWidth = (str: string): string => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode === 0x20) {
      // 半形空格轉全形
      result += String.fromCharCode(0x3000);
    } else if (charCode >= 0x21 && charCode <= 0x7E) {
      // 半形符號和字母轉全形
      result += String.fromCharCode(charCode + 0xFEE0);
    } else {
      result += str[i];
    }
  }
  return result;
}

/**
 * 保留英文與數字
 */
export const onlyAlnum = (input: unknown, toUpper: boolean = false): string => {
  const str = String(input ?? '');
  const cleaned = toHalfWidth(str).replace(/[^a-zA-Z0-9]/g, '');
  return toUpper ? cleaned.toUpperCase() : cleaned;
};

/**
 * 文字轉大寫
 */
export const toUpper = (input: unknown): string => {
  const str = String(input ?? '');
  return str.toUpperCase();
};

/**
 * 保留數字
 */
export const onlyNum = (input: unknown): string => {
  const str = String(input ?? '');
  const cleaned = toHalfWidth(str).replace(/[^0-9]/g, '');
  return cleaned;
};

/**
 * 觸發原生 input 事件，讓 React/Antd Form 同步
 */
const triggerInputChange = (element: HTMLInputElement, value: string) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set;

  nativeInputValueSetter?.call(element, value);

  // 觸發 input 事件
  const inputEvent = new Event('input', { bubbles: true });
  element.dispatchEvent(inputEvent);

  // 觸發 change 事件
  const changeEvent = new Event('change', { bubbles: true });
  element.dispatchEvent(changeEvent);
};

/**
 * 建立自動轉換的 fieldProps
 */
const createAutoTransformProps = (transformFn: (value: string) => string) => {
  let isComposing = false;

  return {
    onInput: (e: React.FormEvent<HTMLInputElement>) => {
      if (isComposing) return;

      const target = e.target as HTMLInputElement;
      const currentValue = target.value;
      const transformed = transformFn(currentValue);

      if (currentValue !== transformed) {
        const start = target.selectionStart ?? 0;
        const end = target.selectionEnd ?? 0;

        // 設置新值
        triggerInputChange(target, transformed);

        // 恢復光標位置
        requestAnimationFrame(() => {
          target.setSelectionRange(start, end);
        });
      }
    },
    onCompositionStart: () => {
      isComposing = true;
    },
    onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => {
      isComposing = false;
      const target = e.target as HTMLInputElement;
      const currentValue = target.value;
      const transformed = transformFn(currentValue);

      if (currentValue !== transformed) {
        setTimeout(() => {
          const start = target.selectionStart ?? 0;
          triggerInputChange(target, transformed);

          // 恢復光標位置
          requestAnimationFrame(() => {
            target.setSelectionRange(start, start);
          });
        }, 0);
      }
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      const currentValue = e.target.value;
      const transformed = transformFn(currentValue);

      if (currentValue !== transformed) {
        triggerInputChange(e.target, transformed);
      }
    },
  };
};

/**
 * 半形轉換 fieldProps
 */
export const halfWidthProps = createAutoTransformProps(toHalfWidth);

/**
 * 全形轉換 fieldProps
 */
export const fullWidthProps = createAutoTransformProps(toFullWidth);

/**
 * 保留英文與數字 fieldProps
 */
export const alnumProps = createAutoTransformProps((val) => onlyAlnum(val, false));

/**
 * 保留英文與數字（大寫）fieldProps
 */
export const alnumUpperProps = createAutoTransformProps((val) => onlyAlnum(val, true));

/**
 * 文字轉大寫 fieldProps
 */
export const toUpperProps = createAutoTransformProps(toUpper);

/**
 * 保留數字 fieldProps
 */
export const numProps = createAutoTransformProps((val) => onlyNum(val));
`}
            />
          </details>

          <hr />

          <Title level={3}>使用範例</Title>
          <MliFormRow>
            <ProFormText
              name="halfWidth"
              label="半形測試"
              placeholder=""
              fieldProps={{
                maxLength: 200,
                ...halfWidthProps
              }}
            />
          </MliFormRow>

          <CodeTsx code={`<ProFormText
  name="halfWidth"
  label="半形測試"
  placeholder=""
  fieldProps={{
    maxLength: 200,
    ...halfWidthProps
  }}
/>`} />

          <hr />

          <MliFormRow>
            <ProFormText
              name="fullWidth"
              label="全形測試"
              placeholder=""
              fieldProps={{
                maxLength: 200,
                ...fullWidthProps
              }}
            />
          </MliFormRow>

          <CodeTsx code={`<ProFormText
  name="fullWidth"
  label="全形測試"
  placeholder=""
  fieldProps={{
    maxLength: 200,
    ...fullWidthProps
  }}
/>`} />

          <hr />

          <MliFormRow>
            <ProFormText
              name="alnum"
              label="保留英數"
              placeholder=""
              fieldProps={{
                maxLength: 200,
                ...alnumProps
              }}
            />
          </MliFormRow>

          <CodeTsx code={`<ProFormText
  name="alnum"
  label="保留英數"
  placeholder=""
  fieldProps={{
    maxLength: 200,
    ...alnumProps
  }}
/>`} />

          <hr />

          <MliFormRow>
            <ProFormText
              name="num"
              label="僅輸入數字"
              placeholder=""
              fieldProps={{
                maxLength: 200,
                ...numProps
              }}
            />
          </MliFormRow>

          <CodeTsx code={`<ProFormText
  name="num"
  label="僅輸入數字"
  placeholder=""
  fieldProps={{
    maxLength: 200,
    ...numProps
  }}
/>`} />

          <hr />

          <MliFormRow>
            <ProFormText
              name="toUpper"
              label="文字轉大寫"
              placeholder=""
              fieldProps={{
                maxLength: 200,
                ...toUpperProps
              }}
            />
          </MliFormRow>

          <CodeTsx code={`<ProFormText
  name="toUpper"
  label="文字轉大寫"
  placeholder=""
  fieldProps={{
    maxLength: 200,
    ...toUpperProps
  }}
/>`} />
          
        </Typography>
      </ProForm>
    </PageContainer>
  )
}
export default DateUtile
