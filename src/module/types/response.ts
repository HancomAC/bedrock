type Resp<T> = Promise<ResponseSuccess<T> | ResponseError<T>>;

export type ResponseSuccess<T> = {
    data: T
}

export type ResponseError<T> = {
    error: string
    code: number
    data?: T
}

export default Resp;
