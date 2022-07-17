declare type Response<T> = Promise<ResponseSuccess<T> | ResponseError<T>>;
export declare type ResponseInternal<T> = Promise<ResponseSuccess<T> | ResponseError<T> | boolean>;
export declare type ResponseSuccess<T> = {
    data: T;
    owner?: number;
};
export declare type ResponseError<T> = {
    error: string;
    code: number;
    owner?: number;
    data?: T;
};
export default Response;
