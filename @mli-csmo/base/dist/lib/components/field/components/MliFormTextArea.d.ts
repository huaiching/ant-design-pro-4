import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { TextAreaProps, TextAreaRef } from 'antd/lib/input/TextArea';
import * as React from 'react';
export interface MliFormTextAreaProps extends ProFormFieldItemProps<TextAreaProps, TextAreaRef> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
    toDBC?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
declare const MliFormTextArea: React.FC<MliFormTextAreaProps>;
export default MliFormTextArea;
