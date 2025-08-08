import { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { InputProps } from 'antd';
import type { InputRef } from 'antd/lib/input';
import * as React from 'react';
export interface MliFormTextProps extends ProFormFieldItemProps<InputProps, InputRef> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
    toDBC?: boolean;
    toCDB?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
declare const MliFormText: React.FC<MliFormTextProps>;
export default MliFormText;
