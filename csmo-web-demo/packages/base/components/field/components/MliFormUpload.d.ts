import type { ProFormUploadButtonProps } from '@ant-design/pro-form/es/components/UploadButton';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import React from 'react';
type BeforeUploadValueType = void | boolean | string | Blob | File;
export interface FieldUploadProps extends ProFormUploadButtonProps {
    moduleName?: string;
    columnName?: string;
    errorMsg?: string;
    uploadRequest?: (files: UploadFile) => Promise<UploadResult>;
    asyncUpload?: boolean;
    tip?: string;
    acceptType?: string;
    showDownload?: boolean;
    handleDownload?: (files: UploadFile) => void;
    handleDelete?: (files: UploadFile) => Promise<void>;
    beforeUpload?: (file: RcFile, FileList: RcFile[]) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
}
export type UploadResult = {
    result: boolean;
    errorFileName?: string;
    errorFileContent?: string;
    [key: string]: any;
};
export type FieldUploadRef = {
    getFileList: () => UploadFile<UploadResult>[];
    setFileList: React.Dispatch<React.SetStateAction<UploadFile<UploadResult>[]>>;
};
declare const _default: React.ForwardRefExoticComponent<FieldUploadProps & React.RefAttributes<FieldUploadRef>>;
export default _default;
