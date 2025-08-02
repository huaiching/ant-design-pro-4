import type { ProFormSliderProps } from '@ant-design/pro-form/lib/components/Slider';
import * as React from 'react';
export interface MliFormSliderProps extends ProFormSliderProps {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormSlider: React.FC<MliFormSliderProps>;
export default MliFormSlider;
