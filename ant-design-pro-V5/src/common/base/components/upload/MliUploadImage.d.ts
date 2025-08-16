import React from 'react';
import './style.less';
export interface MliUploadImageProps {
    value?: string;
    onChange?: (value: string) => void;
    action?: string;
}
declare const MliUploadImage: React.FC<MliUploadImageProps>;
export default MliUploadImage;
