import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/typing';
import { SwitchProps } from 'antd';
import * as React from 'react';
export interface MliFormSwitchProps extends ProFormFieldItemProps<SwitchProps> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormSwitch: React.FC<MliFormSwitchProps>;
export default MliFormSwitch;
