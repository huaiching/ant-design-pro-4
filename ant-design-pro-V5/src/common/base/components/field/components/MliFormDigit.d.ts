import type { ProFormDigitProps } from '@ant-design/pro-form/lib/components/Digit';
import * as React from 'react';
export interface MliFormDigitProps extends ProFormDigitProps {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormDigit: React.FC<MliFormDigitProps>;
export default MliFormDigit;
