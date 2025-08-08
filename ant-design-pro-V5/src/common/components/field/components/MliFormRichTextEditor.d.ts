import type { ProFormFieldItemProps } from '@ant-design/pro-form/es/typing';
import * as React from 'react';
import { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export interface MliFormRichTextEditorProps extends ProFormFieldItemProps<ReactQuillProps> {
    moduleName?: string;
    columnName?: string;
    colSpan?: number;
    required?: boolean;
}
declare const MliFormRichTextEditor: React.FC<MliFormRichTextEditorProps>;
export default MliFormRichTextEditor;
