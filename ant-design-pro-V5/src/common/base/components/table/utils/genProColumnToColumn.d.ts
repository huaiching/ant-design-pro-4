import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type { ProSchemaComponentTypes, UseEditableUtilType } from '@ant-design/pro-utils';
import type { TableColumnType, TableProps } from 'antd';
import { Table } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import type { ContainerType } from '../Store/Provide';
import type { ProColumns } from '../typing';
type ColumnToColumnReturnType<T> = (TableColumnType<T> & {
    index?: number;
    isExtraColumns?: boolean;
    extraColumn?: typeof Table.EXPAND_COLUMN | typeof Table.SELECTION_COLUMN;
    valueType?: string;
    columnName?: string;
})[];
type ColumnToColumnParams<T> = {
    columns: ProColumns<T, any>[];
    counter: ReturnType<ContainerType>;
    columnEmptyText: ProFieldEmptyText;
    type: ProSchemaComponentTypes;
    editableUtils: UseEditableUtilType;
} & Pick<TableProps<T>, 'rowKey' | 'childrenColumnName'>;
export declare function genProColumnToColumn<T extends AnyObject>(params: ColumnToColumnParams<T> & {
    marginSM: number;
}, parents?: ProColumns<T, any>): ColumnToColumnReturnType<T>;
export {};
