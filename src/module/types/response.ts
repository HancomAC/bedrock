type Response<T> = Promise<ResponseSuccess<T> | ResponseError<T>>;

export type ResponseInternal<T> = Promise<ResponseSuccess<T> | ResponseError<T> | boolean>;

export type ResponseSuccess<T> = {
    data: T
}

export type ResponseError<T> = {
    error: string
    code: number
    data?: T
}

export default Response;
