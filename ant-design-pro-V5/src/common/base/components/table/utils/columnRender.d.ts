import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type { ProSchemaComponentTypes, UseEditableUtilType } from '@ant-design/pro-utils';
import { AnyObject } from 'antd/es/_util/type';
import React from 'react';
import type { ContainerType } from '../Store/Provide';
import type { ProColumns } from '../typing';
type ColumnRenderInterface<T> = {
    columnProps: ProColumns<T>;
    text: any;
    rowData: T;
    index: number;
    columnEmptyText?: ProFieldEmptyText;
    type: ProSchemaComponentTypes;
    counter: ReturnType<ContainerType>;
    editableUtils: UseEditableUtilType;
    subName: string[];
    marginSM?: number;
};
type ColumnTitleOption = {
    titleMaskStatus?: Record<string, boolean>;
    handleMaskStatusChange?: (columnName: string) => void;
};
export declare const renderColumnsTitle: (item: ProColumns<any>, titleOption?: ColumnTitleOption) => string | number | boolean | Iterable<React.ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
export declare const defaultOnFilter: (value: string, record: any, dataIndex: string | string[]) => boolean;
export declare function columnRender<T extends AnyObject>({ columnProps, text, rowData, index, columnEmptyText, counter, type, subName, marginSM, editableUtils }: ColumnRenderInterface<T>): any;
export {};
