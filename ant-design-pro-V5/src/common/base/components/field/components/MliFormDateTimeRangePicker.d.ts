import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { RangePickerProps } from 'antd/lib/date-picker';
import * as React from 'react';
export interface MliFormDateTimeRangePickerProps extends ProFormFieldItemProps<RangePickerProps> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormDateTimeRangePicker: React.FC<MliFormDateTimeRangePickerProps>;
export default MliFormDateTimeRangePicker;
