import React from 'react';
import '../style.less';
import { MliUploadExcelProps } from './index';
export type BackendProcessProps = Omit<MliUploadExcelProps, 'processType'>;
declare const BackendProcess: React.FC<BackendProcessProps>;
export default BackendProcess;
