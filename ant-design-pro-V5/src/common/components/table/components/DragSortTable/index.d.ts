import type { ParamsType } from '@ant-design/pro-provider';
import React from 'react';
import type { ProTableProps } from '../../typing';
export type DragTableProps<T, U> = {
    dragSortKey?: string;
    dragSortHandlerRender?: (rowData: T, idx: number) => React.ReactNode;
    onDragSortEnd?: (beforeIndex: number, afterIndex: number, newDataSource: T[]) => Promise<void> | void;
} & ProTableProps<T, U>;
declare function DragSortTable<T extends Record<string, any>, U extends ParamsType = ParamsType, ValueType = 'text'>(props: DragTableProps<T, U>): React.JSX.Element;
export default DragSortTable;
