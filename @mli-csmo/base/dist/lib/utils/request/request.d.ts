import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
interface IRequestOptions extends AxiosRequestConfig {
    skipErrorHandler?: boolean;
    requestInterceptors?: IRequestInterceptorTuple[];
    responseInterceptors?: IResponseInterceptorTuple[];
    [key: string]: any;
}
interface IRequestOptionsWithResponse extends IRequestOptions {
    getResponse: true;
}
interface IRequestOptionsWithoutResponse extends IRequestOptions {
    getResponse: false;
}
interface IRequest {
    <T = any>(url: string, opts: IRequestOptionsWithResponse): Promise<AxiosResponse<T>>;
    <T = any>(url: string, opts: IRequestOptionsWithoutResponse): Promise<T>;
    <T = any>(url: string, opts: IRequestOptions): Promise<T>;
    <T = any>(url: string): Promise<T>;
}
type RequestError = AxiosError | Error;
interface IErrorHandler {
    (error: RequestError, opts: IRequestOptions): void;
}
type WithPromise<T> = T | Promise<T>;
type IRequestInterceptorAxios = (config: IRequestOptions) => WithPromise<IRequestOptions>;
type IRequestInterceptorUmiRequest = (url: string, config: IRequestOptions) => WithPromise<{
    url: string;
    options: IRequestOptions;
}>;
type IRequestInterceptor = IRequestInterceptorAxios | IRequestInterceptorUmiRequest;
type IErrorInterceptor = (error: Error) => Promise<Error>;
type IResponseInterceptor = <T = any>(response: AxiosResponse<T>) => WithPromise<AxiosResponse<T>>;
type IRequestInterceptorTuple = [IRequestInterceptor, IErrorInterceptor] | [IRequestInterceptor] | IRequestInterceptor;
type IResponseInterceptorTuple = [IResponseInterceptor, IErrorInterceptor] | [IResponseInterceptor] | IResponseInterceptor;
export interface RequestConfig<T = any> extends AxiosRequestConfig {
    errorConfig?: {
        errorHandler?: IErrorHandler;
        errorThrower?: (res: T) => void;
    };
    requestInterceptors?: IRequestInterceptorTuple[];
    responseInterceptors?: IResponseInterceptorTuple[];
}
declare const registerConfig: (newConfig: RequestConfig) => void;
declare const getRequestInstance: () => AxiosInstance;
declare const request: IRequest;
export { registerConfig, request, getRequestInstance };
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, RequestError, IRequestInterceptorAxios as RequestInterceptorAxios, IRequestInterceptorUmiRequest as RequestInterceptorUmiRequest, IRequestInterceptor as RequestInterceptor, IErrorInterceptor as ErrorInterceptor, IResponseInterceptor as ResponseInterceptor, IRequestOptions as RequestOptions, IRequest as Request };
