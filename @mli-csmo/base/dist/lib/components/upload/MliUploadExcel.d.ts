import React from 'react';
import { ParsingOptions, Sheet2JSONOpts, WorkSheet } from 'xlsx';
import './style.less';
export type headerParam = {
    key: string;
    value: string;
    default: string;
};
export type MliCommandResponseRow = {
    recordNo: number;
    failedReason: string;
};
export type MliCommandResponse = {
    totalRecords?: number;
    data?: MliCommandResponseRow[];
    successRecords?: number;
    failedRecords?: number;
};
export type UploadExcelFormProps = {
    onCancel: (flag?: boolean) => void;
    onSubmit: (values: any) => Promise<void>;
    import: (values: any, options: any) => Promise<MliCommandResponse>;
    updateModalVisible: boolean;
    title: string;
    templateTitle?: string;
    failTemplateTitle?: string;
    headerMap: headerParam[];
    columnWidths?: [];
    customizeNode?: React.ReactNode;
    downloadTemplate: boolean;
    successMessage?: string;
    customeResultMessage?: (successCount?: number, errorCount?: number) => React.ReactNode;
    customHeaderValue?: (rowItem: any, header: any) => void;
    sheet2JSONOptions?: Sheet2JSONOpts;
    sheetReadOptions?: ParsingOptions;
    customeWorkSheet?: (workSheet: WorkSheet) => void;
    customTemplate?: () => void;
};
export type UploadResult = {
    uploadFinish: boolean;
    successCount: number | undefined;
    fialCount: number | undefined;
    resultData: any[];
};
declare const MliUploadExcel: React.FC<UploadExcelFormProps>;
export default MliUploadExcel;
