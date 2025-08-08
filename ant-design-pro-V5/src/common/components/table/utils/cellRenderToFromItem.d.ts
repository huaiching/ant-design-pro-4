import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type { ProFormFieldProps } from '@ant-design/pro-form';
import type { ProSchemaComponentTypes, UseEditableUtilType } from '@ant-design/pro-utils';
import { AnyObject } from 'antd/es/_util/type';
import React from 'react';
import type { ContainerType } from '../Store/Provide';
import type { ProColumnType } from '../index';
export declare const spellNamePath: (...rest: any[]) => React.Key[];
export type CellRenderFromItemProps<T extends AnyObject> = {
    text: string | number | (string | number)[];
    valueType: ProColumnType['valueType'];
    index: number;
    rowData?: T;
    columnEmptyText?: ProFieldEmptyText;
    columnProps?: ProColumnType<T> & {
        entity: T;
    };
    type?: ProSchemaComponentTypes;
    recordKey?: React.Key;
    mode: 'edit' | 'read';
    prefixName?: string;
    counter: ReturnType<ContainerType>;
    proFieldProps: ProFormFieldProps;
    subName: string[];
    editableUtils: UseEditableUtilType;
    hideColumnToolTip?: boolean;
};
declare function cellRenderToFromItem<T extends AnyObject>(config: CellRenderFromItemProps<T>): React.ReactNode;
export default cellRenderToFromItem;
