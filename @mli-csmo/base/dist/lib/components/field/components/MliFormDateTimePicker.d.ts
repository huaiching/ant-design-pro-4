import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { DatePickerProps } from 'antd';
import * as React from 'react';
export interface MliFormDateTimePickerProps extends ProFormFieldItemProps<DatePickerProps> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormDateTimePicker: React.FC<MliFormDateTimePickerProps>;
export default MliFormDateTimePicker;
