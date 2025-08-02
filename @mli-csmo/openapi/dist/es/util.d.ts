export declare const getAbsolutePath: (filePath: string) => string;
export declare const mkdir: (dir: string) => void;
export declare const prettierFile: (content: string) => [string, boolean];
export declare const writeFile: (folderPath: string, fileName: string, content: string) => boolean;
export declare const getTagName: (name: string) => string;
export declare const formatApiInfo: (apiInfo: Record<string, any>) => any;
type serviceParam = {
    title: string;
    type: string;
    description: string;
    default: string;
    [key: string]: any;
};
type serviceParams = Record<string, serviceParam>;
export declare function formatParamsForYFH(params: serviceParams, paramsObject?: serviceParams): serviceParams;
export declare const stripDot: (str: string) => string;
export {};
