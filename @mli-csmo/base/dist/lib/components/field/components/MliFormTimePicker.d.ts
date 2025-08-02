import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { DatePickerProps } from 'antd/lib/date-picker';
import * as React from 'react';
export interface MliFormTimePickerProps extends ProFormFieldItemProps<DatePickerProps> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormTimePicker: React.FC<MliFormTimePickerProps>;
export default MliFormTimePicker;
