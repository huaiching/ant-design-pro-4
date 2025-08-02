import type { OperationObject } from 'openapi3-ts';
export type GenerateServiceProps = {
    requestLibPath?: string;
    requestImportStatement?: string;
    apiPrefix?: string | ((params: {
        path: string;
        method: string;
        namespace: string;
        functionName: string;
        autoExclude?: boolean;
    }) => string);
    serversPath?: string;
    schemaPath?: string;
    projectName?: string;
    hook?: {
        customFunctionName?: (data: OperationObject) => string;
        customTypeName?: (data: OperationObject) => string;
        customClassName?: (tagName: string) => string;
    };
    namespace?: string;
    pageFolder?: string;
    mockFolder?: string;
    templatesFolder?: string;
    enumStyle?: 'string-literal' | 'enum';
};
export declare const getSchema: (schemaPath: string) => Promise<any>;
export declare const generateService: ({ requestLibPath, schemaPath, pageFolder, mockFolder, ...rest }: GenerateServiceProps) => Promise<void>;
