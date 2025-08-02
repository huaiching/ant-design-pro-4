import { ModalFormProps } from '@ant-design/pro-form/lib/layouts/ModalForm';
import type { UploadFile } from 'antd/es/upload/interface';
import React from 'react';
import './style.less';
export type UploadFormProps = {
    onCancel: (flag?: boolean) => void;
    onSubmit?: (values: any) => Promise<void>;
    import: (files: UploadFile[]) => Promise<UploadResult>;
    updateModalVisible: boolean;
    title: string;
    acceptType: string;
    customizeNode?: React.ReactNode;
    customTemplate?: React.ReactNode;
    maxCount?: number;
    modalFormProps?: ModalFormProps;
};
export type UploadResult = {
    isAllUploadDone?: boolean;
    errorFileName?: string;
    errorFileContent?: string;
};
declare const MliUploadModal: React.FC<UploadFormProps>;
export default MliUploadModal;
