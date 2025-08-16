import { ProFormInstance } from '@ant-design/pro-form';
import type { ParamsType } from '@ant-design/pro-provider';
import type { ButtonProps, FormItemProps } from 'antd';
import React from 'react';
import type { ProTableProps } from '../../typing';
export type EditableFormInstance<T = any> = ProFormInstance<T> & {
    getRowData?: (rowIndex: string | number) => T | undefined;
    getRowsData?: () => T[] | undefined;
    setRowData?: (rowIndex: string | number, data: Partial<T>) => void;
};
export type RecordCreatorProps<DataSourceType> = {
    record: DataSourceType | ((index: number, dataSource: DataSourceType[]) => DataSourceType);
    position?: 'top' | 'bottom';
    newRecordType?: 'dataSource' | 'cache';
    parentKey?: React.Key | ((index: number, dataSource: DataSourceType[]) => React.Key);
};
export type EditableProTableProps<T, U extends ParamsType, ValueType = 'text'> = Omit<ProTableProps<T, U, ValueType>, 'onChange'> & {
    defaultValue?: readonly T[];
    value?: readonly T[];
    onChange?: (value: readonly T[]) => void;
    onTableChange?: ProTableProps<T, U>['onChange'];
    editableFormRef?: React.Ref<EditableFormInstance<T> | undefined>;
    recordCreatorProps?: (RecordCreatorProps<T> & ButtonProps & {
        creatorButtonText?: React.ReactNode;
    }) | false;
    maxLength?: number;
    onValuesChange?: (values: T[], record: T) => void;
    controlled?: boolean;
    formItemProps?: Omit<FormItemProps, 'children' | 'name'>;
};
declare function FieldEditableTable<DataType extends Record<string, any>, Params extends ParamsType = ParamsType, ValueType = 'text'>(props: EditableProTableProps<DataType, Params, ValueType>): import("react/jsx-runtime").JSX.Element;
declare namespace FieldEditableTable {
    var RecordCreator: <T = Record<string, any>>(props: RecordCreatorProps<T> & {
        children: JSX.Element;
    }) => React.FunctionComponentElement<any>;
}
export default FieldEditableTable;
