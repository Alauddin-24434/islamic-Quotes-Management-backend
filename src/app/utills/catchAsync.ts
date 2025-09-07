import { NextFunction, Request, Response } from "express"


export const catchAsync = <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch(next)
    }
}