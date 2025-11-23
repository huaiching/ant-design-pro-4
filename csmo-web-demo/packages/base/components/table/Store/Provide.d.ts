import type { TableColumnType } from 'antd';
import React from 'react';
import { SwitchType } from '../../../utils';
import type { DensitySize } from '../components/ToolBar/DensityIcon';
import type { ProTableProps } from '../index';
import type { ActionType, ProColumns } from '../typing';
export type ColumnsState = {
    show?: boolean;
    fixed?: 'right' | 'left' | undefined;
    order?: number;
    disable?: boolean | {
        checkbox: boolean;
    };
};
export type ProTableColumn<T> = ColumnsState & TableColumnType<T> & {
    columnName?: string;
    mask?: {
        titleMaskType?: SwitchType;
        defaultMaskStatus?: boolean;
    };
};
export type UseContainerProps<T = any> = {
    columnsStateMap?: Record<string, ColumnsState>;
    onColumnsStateChange?: (map: Record<string, ColumnsState>) => void;
    size?: DensitySize;
    defaultSize?: DensitySize;
    onSizeChange?: (size: DensitySize) => void;
    columns?: ProTableColumn<T>[] | ProColumns<T, T>[];
    columnsState?: ProTableProps<any, any, any>['columnsState'];
};
declare function useContainer(props?: UseContainerProps): {
    action: ActionType | undefined;
    setAction: (newAction?: ActionType) => void;
    sortKeyColumns: string[];
    setSortKeyColumns: (keys: string[]) => void;
    propsRef: React.MutableRefObject<ProTableProps<any, any, any> | undefined>;
    columnsMap: Record<string, ColumnsState>;
    keyWords: string | undefined;
    setKeyWords: (k: string | undefined) => void;
    titleMaskStatus: Record<string, boolean>;
    switchTitleMaskStatus: (columnName: string) => void;
    setTableSize: (updater: DensitySize | ((origin: DensitySize) => DensitySize), ignoreDestroy?: boolean | undefined) => void;
    tableSize: DensitySize;
    prefixName: any;
    setPrefixName: (name: any) => void;
    setColumnsMap: (updater: Record<string, ColumnsState> | ((origin: Record<string, ColumnsState>) => Record<string, ColumnsState>), ignoreDestroy?: boolean | undefined) => void;
    columns: ProTableColumn<any>[] | ProColumns<any, any>[] | undefined;
    rootDomRef: React.RefObject<HTMLDivElement>;
    clearPersistenceStorage: () => void;
    defaultColumnKeyMap: Record<string, any>;
};
declare const TableContext: React.Context<{
    action: ActionType | undefined;
    setAction: (newAction?: ActionType) => void;
    sortKeyColumns: string[];
    setSortKeyColumns: (keys: string[]) => void;
    propsRef: React.MutableRefObject<ProTableProps<any, any, any> | undefined>;
    columnsMap: Record<string, ColumnsState>;
    keyWords: string | undefined;
    setKeyWords: (k: string | undefined) => void;
    titleMaskStatus: Record<string, boolean>;
    switchTitleMaskStatus: (columnName: string) => void;
    setTableSize: (updater: DensitySize | ((origin: DensitySize) => DensitySize), ignoreDestroy?: boolean | undefined) => void;
    tableSize: DensitySize;
    prefixName: any;
    setPrefixName: (name: any) => void;
    setColumnsMap: (updater: Record<string, ColumnsState> | ((origin: Record<string, ColumnsState>) => Record<string, ColumnsState>), ignoreDestroy?: boolean | undefined) => void;
    columns: ProTableColumn<any>[] | ProColumns<any, any>[] | undefined;
    rootDomRef: React.RefObject<HTMLDivElement>;
    clearPersistenceStorage: () => void;
    defaultColumnKeyMap: Record<string, any>;
}>;
export type ContainerType = typeof useContainer;
declare const Container: React.FC<{
    initValue: UseContainerProps<any>;
    children: React.ReactNode;
}>;
export { Container, TableContext };
