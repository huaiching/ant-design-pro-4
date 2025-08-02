import { ProFormRadio } from '@ant-design/pro-form';
import type { ProFormRadioGroupProps } from '@ant-design/pro-form/lib/components/Radio';
import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { RadioProps } from 'antd';
import * as React from 'react';
export interface MliFormRadioGroupProps extends ProFormRadioGroupProps {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormRadioGroup: React.FC<MliFormRadioGroupProps>;
export interface MliFormRadioProps extends ProFormFieldItemProps<RadioProps> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormRadio: React.FC<MliFormRadioProps>;
declare const WrappedMliFormRadio: typeof MliFormRadio & {
    Group: typeof MliFormRadioGroup;
    Button: typeof ProFormRadio.Button;
};
export default WrappedMliFormRadio;
