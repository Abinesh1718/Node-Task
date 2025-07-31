import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export const authenticate = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Token Missing' })


    try {
        const decoded = jwt.verify(token, 'ABINESH')
        req.user = decoded;
        next()

    } catch (error) {
        return res.status(403).json({ error: 'Invaid Token' })
    }
}