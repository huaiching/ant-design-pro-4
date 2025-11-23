import type { ProCardProps } from '@ant-design/pro-card';
import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type { LightWrapperProps, ProFormProps, QueryFilterProps } from '@ant-design/pro-form';
import { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import type { ProCoreActionType, ProSchema, ProSchemaComponentTypes, ProTableEditableFnType, RowEditableConfig, SearchTransformKeyFn } from '@ant-design/pro-utils';
import type { ButtonProps, InputProps, SpinProps, TableProps } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import type { NamePath } from 'antd/lib/form/interface';
import type { InputRef, SearchProps } from 'antd/lib/input';
import type { ColumnFilterItem, ColumnType, CompareFn, SortOrder } from 'antd/lib/table/interface';
import type dayjs from 'dayjs';
import type { Rule } from 'rc-field-form/lib/interface';
import type React from 'react';
import type { CSSProperties } from 'react';
import type { SwitchType } from '../../utils';
import type { ColumnsState, ContainerType } from './Store/Provide';
import type { AlertRenderType } from './components/Alert';
import type { SearchConfig, TableFormItem } from './components/Form/FormRender';
import type { ListToolBarProps } from './components/ListToolBar';
import type { OptionConfig, ToolBarProps } from './components/ToolBar';
import type { DensitySize } from './components/ToolBar/DensityIcon';
export type MliSort = {
    field?: string;
    direction?: string;
};
export type Criterion = {
    field?: string;
    relativeTo?: string;
    values?: string[];
    compoundOperator?: 'AND' | 'OR' | 'NOT';
    value?: string;
    nested?: Criterion[];
    sorts?: MliSort[];
    ignoreCase?: boolean;
    queryOperator?: 'BETWEEN' | 'LT' | 'LE' | 'GT' | 'GE' | 'EQ' | 'NOT_EQ' | 'LIKE' | 'START_WITH' | 'NOT_LIKE' | 'IN' | 'NOT_IN' | 'NULL' | 'NOT_NULL' | 'TRUE' | 'NOT_TRUE' | 'EMPTY' | 'NOT_EMPTY';
};
export type ExportProps = {
    reportCode?: string;
    securityLevel?: string;
    pageSize?: string;
};
export type ExportOptions<T = any> = {
    disabled?: boolean;
    defaultWaterMark?: string;
    exportFileName?: string;
    props?: ExportProps;
    exportBtnProp?: ButtonProps;
    exportTitle?: string;
    enableDateName?: boolean;
    enableDefaultMark?: boolean;
    enableSetWaterMark?: boolean;
    exportFunction?: (body: any) => Promise<any>;
    exportFileType?: 'PDF' | 'EXCEL' | 'ALL';
    exportRequest: (params: {
        page?: number;
        size?: number;
    }, body: any, options?: Record<string, any>) => any;
    fieldsFilter?: (columns: (keyof T)[]) => string[];
    waterMarkFieldProps?: ProFormFieldItemProps<InputProps, InputRef>;
};
export type PageInfo = {
    pageSize: number;
    total: number;
    current: number;
};
export type RequestData<T> = {
    data: T[] | undefined;
    success?: boolean;
    total?: number;
} & Record<string, any>;
export type UseFetchDataAction<T = any> = {
    dataSource: T[];
    setDataSource: (dataSource: T[]) => void;
    loading: boolean | SpinProps | undefined;
    pageInfo: PageInfo;
    reload: () => Promise<void>;
    fullScreen?: () => void;
    reset: () => void;
    pollingLoading: boolean;
    setPageInfo: (pageInfo: Partial<PageInfo>) => void;
};
export type ColumnRenderInterface<T> = {
    item: ProColumns<T>;
    text: any;
    row: T;
    index: number;
    columnEmptyText?: ProFieldEmptyText;
    type: ProSchemaComponentTypes;
    counter: ReturnType<ContainerType>;
};
export type TableRowSelection = TableProps<any>['rowSelection'];
export type ExtraProColumnType<T> = Omit<ColumnType<T>, 'render' | 'children' | 'title' | 'filters' | 'onFilter' | 'sorter'> & {
    sorter?: string | boolean | CompareFn<T> | {
        compare?: CompareFn<T>;
        multiple?: number;
    };
};
export type ProColumnType<T = unknown, ValueType = 'text'> = ProSchema<T, ExtraProColumnType<T> & {
    mask?: {
        titleMaskType?: SwitchType;
        defaultMaskStatus?: boolean;
    };
    hideColumnToolTip?: boolean;
    children?: ProColumns<T>[];
    index?: number;
    colSize?: number;
    initialValue?: any;
    ellipsis?: ColumnType<T>['ellipsis'];
    copyable?: boolean;
    hideInSearch?: boolean;
    search?: boolean | {
        transform: SearchTransformKeyFn;
    };
    hideInTable?: boolean;
    hideInForm?: boolean;
    hideInSetting?: boolean;
    filters?: boolean | ColumnFilterItem[];
    onFilter?: boolean | ColumnType<T>['onFilter'];
    order?: number;
    editable?: boolean | ProTableEditableFnType<T>;
    listKey?: string;
    readonly?: boolean;
    disable?: boolean | {
        checkbox: boolean;
    };
    moduleName?: string;
    columnName?: string;
    startColumnName?: string;
    endColumnName?: string;
    rules?: Rule[];
}, ProSchemaComponentTypes, ValueType, {
    lightProps?: LightWrapperProps;
}>;
export type ProColumns<T = any, ValueType = 'text'> = ProColumnType<T, ValueType>;
export type BorderedType = 'search' | 'table';
export type Bordered = boolean | {
    search?: boolean;
    table?: boolean;
};
export type ColumnStateType = {
    persistenceType?: 'localStorage' | 'sessionStorage';
    persistenceKey?: string;
    defaultValue?: Record<string, ColumnsState>;
    value?: Record<string, ColumnsState>;
    onChange?: (map: Record<string, ColumnsState>) => void;
};
export type ProTableProps<DataSource, U, ValueType = 'text'> = {
    moduleName: string;
    beforeReset?: () => void;
    beforeClean?: () => void;
    beforeSubmit?: (params: U) => Promise<any>;
    onInit?: (value: U, originValue?: any) => void;
    searchParamsTransform?: (params: U, sort: any[]) => Criterion;
    onValuesChange?: ProFormProps['onValuesChange'];
    exportOptions?: ExportOptions<DataSource>;
    toolbarAfterRender?: JSX.Element | null;
    columns?: ProColumns<DataSource, ValueType>[];
    toolbar?: ListToolBarProps;
    ghost?: boolean;
    params?: U;
    columnsStateMap?: Record<string, ColumnsState>;
    onColumnsStateChange?: (map: Record<string, ColumnsState>) => void;
    columnsState?: ColumnStateType;
    onSizeChange?: (size: DensitySize) => void;
    cardProps?: ProCardProps | false;
    tableRender?: (props: ProTableProps<DataSource, U, ValueType>, defaultDom: JSX.Element, domList: {
        toolbar: JSX.Element | undefined;
        alert: JSX.Element | undefined;
        table: JSX.Element | undefined;
    }) => React.ReactNode;
    tableViewRender?: (props: TableProps<DataSource>, defaultDom: JSX.Element) => JSX.Element | undefined;
    tableExtraRender?: (props: ProTableProps<DataSource, U, ValueType>, dataSource: DataSource[]) => React.ReactNode;
    searchFormRender?: (props: ProTableProps<DataSource, U, ValueType>, defaultDom: JSX.Element) => React.ReactNode;
    request?: (params: U & {
        pageSize?: number;
        current?: number;
        keyword?: string;
    }, transformParams: Criterion | null, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => Promise<Partial<RequestData<DataSource>>>;
    postData?: any;
    defaultData?: DataSource[];
    actionRef?: React.Ref<ActionType | undefined>;
    formRef?: TableFormItem<DataSource>['formRef'];
    toolBarRender?: ToolBarProps<DataSource>['toolBarRender'] | false;
    optionsRender?: ToolBarProps<DataSource>['optionsRender'];
    onLoad?: (dataSource: DataSource[]) => void;
    onLoadingChange?: (loading: boolean | SpinProps | undefined) => void;
    onRequestError?: (e: Error) => void;
    polling?: number | ((dataSource: DataSource[]) => number);
    tableClassName?: string;
    tableStyle?: CSSProperties;
    headerTitle?: React.ReactNode;
    tooltip?: string | LabelTooltipType;
    options?: OptionConfig | false;
    search?: false | SearchConfig;
    form?: Omit<ProFormProps & QueryFilterProps, 'form'>;
    dateFormatter?: (string & {}) | 'string' | 'number' | ((value: dayjs.Dayjs, valueType: string) => string | number) | false;
    beforeSearchSubmit?: (params: Partial<U>) => any;
    tableAlertRender?: AlertRenderType<DataSource>;
    tableAlertOptionRender?: AlertRenderType<DataSource>;
    rowSelection?: (TableProps<DataSource>['rowSelection'] & {
        alwaysShowAlert?: boolean;
    }) | false;
    style?: React.CSSProperties;
    type?: ProSchemaComponentTypes;
    onSubmit?: (params: U) => void;
    onReset?: () => void;
    columnEmptyText?: ProFieldEmptyText;
    manualRequest?: boolean;
    editable?: RowEditableConfig<DataSource>;
    onDataSourceChange?: (dataSource: DataSource[]) => void;
    cardBordered?: Bordered;
    debounceTime?: number;
    revalidateOnFocus?: boolean;
    defaultSize?: SizeType;
    name?: NamePath;
    ErrorBoundary?: React.ComponentClass<any, any> | false;
} & Omit<TableProps<DataSource>, 'columns' | 'rowSelection'>;
export type ActionType = ProCoreActionType & {
    fullScreen?: () => void;
    setPageInfo?: (page: Partial<PageInfo>) => void;
    resetForm?: () => any;
    resetSearch: () => void;
    getSorts?: () => any;
    getSearchParams?: () => any;
    getSearchTransformParams?: () => any;
    getSearchHistoryTransformParams?: () => any;
    getTableColumns: () => any;
    getSessionItem: () => any;
    ifSessionExisted: () => any;
    createUrlState: (type: 'normal' | 'encode') => string;
    resetSearchFormValues: (values: any) => void;
    resetWithOutSort: () => void;
};
export type UseFetchProps = {
    dataSource?: any;
    loading: UseFetchDataAction['loading'];
    onLoadingChange?: (loading: UseFetchDataAction['loading']) => void;
    onLoad?: (dataSource: any[], extra: any) => void;
    onDataSourceChange?: (dataSource?: any) => void;
    postData: (dataSource: any[]) => any[];
    pageInfo: {
        current?: number;
        pageSize?: number;
        defaultCurrent?: number;
        defaultPageSize?: number;
    } | false;
    onPageInfoChange?: (pageInfo: PageInfo) => void;
    effects?: any[];
    onRequestError?: (e: Error) => void;
    manual: boolean;
    debounceTime?: number;
    polling?: number | ((dataSource: any[]) => number);
    revalidateOnFocus?: boolean;
};
export type OptionSearchProps = Omit<SearchProps, 'onSearch'> & {
    onSearch?: (keyword: string) => Promise<boolean | undefined> | boolean | undefined;
};
