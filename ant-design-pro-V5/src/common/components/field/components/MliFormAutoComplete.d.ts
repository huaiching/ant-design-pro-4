import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/typing';
import type { AutoCompleteProps } from 'antd';
import * as React from 'react';
export interface MliFormAutoCompleteProps extends ProFormFieldItemProps<AutoCompleteProps> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    needCol?: boolean;
    required?: boolean;
}
declare const MliFormAutoComplete: React.FC<MliFormAutoCompleteProps>;
export default MliFormAutoComplete;
