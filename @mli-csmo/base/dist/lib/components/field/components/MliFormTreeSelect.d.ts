import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '@ant-design/pro-form/es/typing';
import type { TreeSelectProps } from 'antd';
import type { RefSelectProps } from 'antd/es/select';
import * as React from 'react';
type ProTreeSelectProps = ProFormFieldItemProps<TreeSelectProps<any>, RefSelectProps> & ProFormFieldRemoteProps;
export interface MliFormTreeSelectProps extends ProTreeSelectProps {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
    readonly?: boolean;
}
declare const MliFormTreeSelect: React.FC<MliFormTreeSelectProps>;
export default MliFormTreeSelect;
