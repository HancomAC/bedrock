declare type Response<T> = Promise<ResponseSuccess<T> | ResponseError<T>>;
export declare type ResponseInternal<T> = Promise<ResponseSuccess<T> | ResponseError<T> | boolean>;
export declare type ResponseSuccess<T> = {
    data: T;
};
export declare type ResponseError<T> = {
    error: string;
    code: number;
    data?: T;
};
export default Response;
