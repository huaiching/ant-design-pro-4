// src/utils/formInputUtils.ts

import { FormInstance } from 'antd';

/**
 * 文字轉為半形
 */
export const toHalfWidth = (str: string): string => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 0xFF01 && charCode <= 0xFF5E) {
      result += String.fromCharCode(charCode - 0xFEE0);
    } else {
      result += str[i];
    }
  }
  return result;
}

/**
 * 文字轉為全形
 */
export const toFullWidth = (str: string): string => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 0x21 && charCode <= 0x7E) {
      result += String.fromCharCode(charCode + 0xFEE0);
    } else {
      result += str[i];
    }
  }
  return result;
}

/**
 * 僅保留英數字
 */
export const onlyAlnum = (input: unknown, toUpper: boolean = false): string => {
  const str = String(input ?? '');
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '');
  return toUpper ? cleaned.toUpperCase() : cleaned;
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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isComposing) return;
      const transformed = transformFn(e.target.value);
      if (e.target.value !== transformed) {
        triggerInputChange(e.target, transformed);
      }
    },
    onCompositionStart: () => {
      isComposing = true;
    },
    onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => {
      isComposing = false;
      const target = e.target as HTMLInputElement;
      const transformed = transformFn(target.value);
      if (target.value !== transformed) {
        triggerInputChange(target, transformed);
      }
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      const transformed = transformFn(e.target.value);
      if (e.target.value !== transformed) {
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
 * 純英數字 fieldProps
 */
export const alnumProps = createAutoTransformProps((val) => onlyAlnum(val, false));

/**
 * 純英數字（大寫）fieldProps
 */
export const alnumUpperProps = createAutoTransformProps((val) => onlyAlnum(val, true));

/**
 * 建立自訂轉換 fieldProps
 */
export const createTransformProps = (transformFn: (value: string) => string) => {
  return createAutoTransformProps(transformFn);
};
