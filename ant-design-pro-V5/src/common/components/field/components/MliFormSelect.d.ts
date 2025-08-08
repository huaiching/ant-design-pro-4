import type { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import * as React from 'react';
export interface MliFormSelectProps extends ProFormSelectProps {
    key?: string | number;
    moduleName?: string;
    columnName?: string;
    labelText?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormSelect: React.FC<MliFormSelectProps>;
export default MliFormSelect;
