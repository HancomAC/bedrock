declare type Resp<T> = Promise<ResponseSuccess<T> | ResponseError<T>>;
export declare type ResponseSuccess<T> = {
    data: T;
};
export declare type ResponseError<T> = {
    error: string;
    code: number;
    data?: T;
};
export default Resp;
