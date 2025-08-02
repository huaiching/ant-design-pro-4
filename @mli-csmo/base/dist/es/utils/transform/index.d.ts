import type { SortOrder } from 'antd/lib/table/interface';
import type { RcFile } from 'antd/lib/upload/interface';
import type { IntlShape } from 'react-intl';
export declare const sortToArray: (sort: Record<string, SortOrder>, initDefault?: boolean, defaultSort?: {
    field: string;
    direction: 'asc' | 'desc';
}[]) => {
    field: string;
    direction: 'asc' | 'desc';
}[];
export declare const transformNumber2String: (sourceObj: any) => any;
export declare const transformColumnSort2Dxp: (sort: Record<string, SortOrder>) => {
    field: string;
    direction: string;
}[];
export declare const filterUsefulParams: (params: any) => any;
export declare const transformMoney2String: (money: number | undefined, formatMessage: IntlShape['formatMessage'], unitMessageId?: string) => string;
export declare const resolverGenderById: (id: string) => "" | "male" | "female";
export declare const percentFormatter: (value: any) => string;
export declare const percentParser: (value: string | undefined) => string | undefined;
export declare const thousandthFormatter: (value: any) => any;
export declare const thousandthParser: (value: string | undefined) => string | undefined;
export declare const toDBC: (str: string) => string;
export declare const toCDB: (str: string) => string;
export declare const getFileSize: (value: number | string) => string;
export declare const getFileIconByName: (name: string) => string;
export declare const addDotFormat4Money: (money: number | undefined) => string;
export declare const getLookupLabel: (lookup: {
    label: string;
    value: string;
}[] | undefined, value: string | undefined) => string | undefined;
export declare const fileTypes: string[];
export declare const canFileTypeUpload: (fileList: RcFile[], limitFileTypes?: string[]) => {
    validateFlag: boolean;
    unPassType: string;
};
type FieldName = {
    label?: string;
    value?: string;
    children?: string;
};
export declare const treeDataFlatten: (treeData?: any[], fieldName?: FieldName) => Record<string, any>;
export declare const generateFieldCriterion: (arr: any[][], compoundOperator?: 'AND' | 'OR' | 'NOT') => any;
export declare const transformColumnSort2DxpDefault: (sort: Record<string, SortOrder>, defaultColumn?: string, defaultDirection?: string) => {
    field: string;
    direction: string;
}[];
export * from './date';
