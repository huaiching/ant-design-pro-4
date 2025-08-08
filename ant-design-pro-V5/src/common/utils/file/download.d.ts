export declare const base64ToBlob: (base64: string) => Blob;
export declare const downloadFile: (fileResponse: BlobPart, name: string, blobOption?: BlobPropertyBag) => void;
export declare const fileRead: (file: any, type?: 'text' | 'dataUrl') => Promise<unknown>;
