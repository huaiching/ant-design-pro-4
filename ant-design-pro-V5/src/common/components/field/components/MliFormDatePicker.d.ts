import type { ProFormItemProps } from '@ant-design/pro-form';
import type { DatePickerProps } from 'antd';
import * as React from 'react';
export interface MliFormDatePickerProps extends ProFormItemProps<DatePickerProps, any> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormDatePicker: React.FC<MliFormDatePickerProps>;
export default MliFormDatePicker;
