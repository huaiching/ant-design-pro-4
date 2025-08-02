import type { RequestData, UseFetchDataAction, UseFetchProps } from './typing';
declare const useFetchData: <DataSource extends RequestData<any>>(getData: ((params?: {
    pageSize: number;
    current: number;
}) => Promise<DataSource>) | undefined, defaultData: any[] | undefined, options: UseFetchProps) => UseFetchDataAction;
export default useFetchData;
