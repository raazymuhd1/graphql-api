import { Request, Response, NextFunction } from "express"

export const notFound = async(req: Request, res: Response, next: NextFunction) => {
    res.send(`<h2> Page Not Found ${req.url} </h2>`)
}