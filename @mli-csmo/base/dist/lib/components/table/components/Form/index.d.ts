import { ProFormProps } from '@ant-design/pro-form';
import type { TablePaginationConfig } from 'antd';
import React from 'react';
import type { ActionType, ProTableProps } from '../../typing';
type BaseFormProps<T, U> = {
    pagination?: TablePaginationConfig | false;
    beforeSearchSubmit?: (params: Partial<U>) => any;
    action: React.MutableRefObject<ActionType | undefined>;
    onSubmit?: (params: U) => void;
    onReset?: () => void;
    loading: boolean;
    onFormSearchSubmit: (params: U) => void;
    columns: ProTableProps<T, U, any>['columns'];
    dateFormatter: ProTableProps<T, U, any>['dateFormatter'];
    formRef: ProTableProps<T, U, any>['formRef'];
    type: ProTableProps<T, U, any>['type'];
    cardBordered: ProTableProps<T, U, any>['cardBordered'];
    form: ProTableProps<T, U, any>['form'];
    search: ProTableProps<T, U, any>['search'];
    manualRequest: ProTableProps<T, U, any>['manualRequest'];
    collapsed: boolean;
    setNeedCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    onValuesChange?: ProFormProps['onValuesChange'];
    moduleName: string;
    onInit?: (value: U, originValue?: U) => void;
};
declare class FormSearch<T, U> extends React.Component<BaseFormProps<T, U> & {
    ghost?: boolean;
}> {
    onSubmit: (value: U, firstLoad: boolean) => void;
    onReset: (value: Partial<U>) => void;
    isEqual: (next: BaseFormProps<T, U>) => boolean;
    shouldComponentUpdate: (next: BaseFormProps<T, U>) => boolean;
    render: () => import("react/jsx-runtime").JSX.Element;
}
export default FormSearch;
