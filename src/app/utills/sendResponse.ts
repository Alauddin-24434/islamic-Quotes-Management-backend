import { Response } from "express";

interface Iresponse<T> {
    success: boolean,
    statusCode: number,
    message: string,
    data?: T

}

export const sendResponse = <T>(res: Response, payload: Iresponse<T>) => {
    const { success, statusCode, message, data } = payload;
    return res.status(statusCode).json({
        success,
        message,
        data,
    })
}