import type { ProFormCheckboxGroupProps, ProFormCheckboxProps } from '@ant-design/pro-form/lib/components/Checkbox';
import * as React from 'react';
export interface MliFormCheckboxGroupProps extends ProFormCheckboxGroupProps {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormCheckboxGroup: React.FC<MliFormCheckboxGroupProps>;
export interface MliFormCheckboxProps extends ProFormCheckboxProps {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const WrappedMliFormCheckbox: typeof MliFormCheckboxGroup & {
    Group: typeof MliFormCheckboxGroup;
};
export default WrappedMliFormCheckbox;
