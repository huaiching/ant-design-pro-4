import type { ProFieldFCRenderProps, ProRenderFieldPropsType } from '@ant-design/pro-provider';
import React from 'react';
import { ProFieldRequestData, ProFieldValueType } from '@ant-design/pro-utils';
type RenderProps = Omit<ProFieldFCRenderProps, 'text' | 'mode'> & ProRenderFieldPropsType & {
    request?: ProFieldRequestData;
    emptyText?: React.ReactNode;
    visible?: boolean;
    onVisible?: (visible: boolean) => void;
    [key: string]: any;
};
declare const defaultRenderText: (valueType: ProFieldValueType | 'autoComplete', props: RenderProps & {
    initialValue?: any;
}) => React.ReactNode;
export default defaultRenderText;
