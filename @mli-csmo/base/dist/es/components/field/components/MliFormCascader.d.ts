import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { CascaderProps } from 'antd';
import * as React from 'react';
export interface MliFormCascaderProps extends ProFormFieldItemProps<CascaderProps> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormCascader: React.FC<MliFormCascaderProps>;
export default MliFormCascader;
