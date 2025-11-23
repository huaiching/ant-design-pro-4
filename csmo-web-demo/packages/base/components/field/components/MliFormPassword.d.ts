import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { InputRef, PasswordProps } from 'antd/lib/input';
import * as React from 'react';
export interface MliFormPasswordProps extends ProFormFieldItemProps<PasswordProps, InputRef> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormPassword: React.FC<MliFormPasswordProps>;
export default MliFormPassword;
