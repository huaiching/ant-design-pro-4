import React from 'react';
import { ParsingOptions, Sheet2JSONOpts, WorkSheet } from 'xlsx';
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
export interface MliUploadExcelProps {
    onCancel?: (flag?: boolean) => void;
    onSubmit?: (values: any) => Promise<void>;
    import: (values: any, file?: any, options?: any) => Promise<MliCommandResponse>;
    updateModalVisible: boolean;
    title: string;
    templateTitle?: string;
    failTemplateTitle?: string;
    headerMap?: headerParam[];
    columnWidths?: [];
    customizeNode?: React.ReactNode;
    downloadTemplate?: boolean;
    successMessage?: string;
    showTip?: boolean;
    showCustomizedMessage?: boolean;
    beforeUpload?: (file: File) => boolean;
    onSuccess?: (response: any, file: File) => void;
    onError?: (error: any, file: File) => void;
    customeResultMessage?: (successCount?: number, errorCount?: number) => React.ReactNode;
    customHeaderValue?: (rowItem: any, header: any) => void;
    sheet2JSONOptions?: Sheet2JSONOpts;
    sheetReadOptions?: ParsingOptions;
    customeWorkSheet?: (workSheet: WorkSheet) => void;
    customTemplate?: () => void;
    processType?: 'frontend' | 'backend';
}
export type UploadResult = {
    uploadFinish: boolean;
    successCount: number | undefined;
    failCount: number | undefined;
    resultData?: any[] | undefined;
    failBlob?: Blob | undefined;
};
declare const MliUploadExcel: React.FC<MliUploadExcelProps>;
export default MliUploadExcel;
