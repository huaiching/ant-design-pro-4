import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { RangePickerProps } from 'antd/lib/date-picker';
import * as React from 'react';
export interface MliFormDateRangePickerProps extends ProFormFieldItemProps<RangePickerProps> {
    moduleName?: string;
    columnName?: string;
    startColumnName?: string;
    endColumnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormDateRangePicker: React.FC<MliFormDateRangePickerProps>;
export default MliFormDateRangePicker;
