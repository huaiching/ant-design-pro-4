import type { ProFormMoneyProps } from '@ant-design/pro-form/lib/components/Money';
import * as React from 'react';
export interface MliFormMoneyProps extends ProFormMoneyProps {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormMoney: React.FC<MliFormMoneyProps>;
export default MliFormMoney;
