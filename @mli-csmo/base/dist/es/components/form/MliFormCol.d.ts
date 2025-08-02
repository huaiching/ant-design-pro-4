import type { ColProps } from 'antd/lib/grid/col';
import * as React from 'react';
import { PropsWithChildren } from 'react';
type FormColProps = {
    colSize?: number;
    colProps?: ColProps;
};
declare const MliFormCol: React.FC<PropsWithChildren<FormColProps>>;
export default MliFormCol;
