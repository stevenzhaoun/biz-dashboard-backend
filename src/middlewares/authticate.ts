import { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import { verify } from 'jsonwebtoken';
const { jwtSecret } = config;

const NO_AUTH_ROUTES = ['/auth/login']

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if(NO_AUTH_ROUTES.includes(req.path)) {
        return next()
    }

    const tokenHeader = req.header('Authorization')
    if (!tokenHeader) {
        return res.status(403).send('No auth token');
    }

    const token = tokenHeader.split(' ')[1]
    verify(token, jwtSecret, (err: any, user: any) => {
        if (err) return res.status(403).send('Failed to authenticate with this token');
        (req as any).user = user
        next()
    })
}