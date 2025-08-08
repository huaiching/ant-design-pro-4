import type { ModalProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import React from 'react';
import './MliExcelUploadModal.less';
type CommandResponse<T> = {
    totalRecords?: number;
    data?: T[];
    successRecords?: number;
    failedRecords?: number;
};
type FileHeader = {
    key: string;
    label: string;
};
type ExcelUploadModalProps<T> = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    fileHeaders: FileHeader[];
    columnWidths?: [];
    failedFileName: string;
    request: (data: Omit<T, 'recordNo' | 'failedReason'>[]) => Promise<CommandResponse<T>>;
    modalOnCancel: ModalProps['onCancel'];
    modalOnOk: (excelResult: Omit<T, 'recordNo' | 'failedReason'>[], response: T[] | undefined, uploadFileList?: UploadFile<any>[]) => void;
    modalTitle?: string;
    topSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    failLabel?: string;
    modalProps?: any;
    range?: number;
    needOnOk?: boolean;
    noFailedReason?: boolean;
    needImportOrder?: boolean;
    keepModalOpen?: boolean;
    extraAddFailedInfo?: (result: Record<string, unknown>[], fileHeaders: FileHeader[]) => void;
};
declare const MliExcelUploadModal: <T extends Record<string, unknown>>({ visible, setVisible, fileHeaders, columnWidths, request, failedFileName, modalTitle, modalOnCancel, modalOnOk, topSlot, rightSlot, failLabel, modalProps, range, needOnOk, noFailedReason, needImportOrder, keepModalOpen, extraAddFailedInfo }: ExcelUploadModalProps<T>) => import("react/jsx-runtime").JSX.Element;
export default MliExcelUploadModal;
