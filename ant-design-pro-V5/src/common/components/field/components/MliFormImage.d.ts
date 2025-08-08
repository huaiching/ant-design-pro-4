import type { ProFormFieldItemProps } from '@ant-design/pro-form/lib/typing';
import * as React from 'react';
import { MliUploadImageProps } from '../../upload/MliUploadImage';
export interface MliFormRichTextEditorProps extends ProFormFieldItemProps<MliUploadImageProps> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
    action?: string;
}
declare const MliFormImage: React.FC<MliFormRichTextEditorProps>;
export default MliFormImage;
