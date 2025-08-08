import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { RangePickerProps } from 'antd/lib/date-picker';
import * as React from 'react';
export interface MliFormTimeRangePickerProps extends ProFormFieldItemProps<RangePickerProps> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormTimePicker: React.FC<MliFormTimeRangePickerProps>;
export default MliFormTimePicker;
