import { NextFunction, Response } from 'express';
import { prisma } from '../client';

export const authorize =  (targetPermissions: number[]) => async (req: any, res: Response, next: NextFunction) => {
    if(!req.user) {
        return res.status(403).send('Unauthorized')
    }

    const userId = req.user.id

    const userPermissions = await prisma.user.findUnique({
        where: {
            id: userId
        }
    }).role().permissions()

    if(!userPermissions) {
        return res.status(403).send('Unauthorized')
    }

    if(!userPermissions.map(p => p.id).some(p => targetPermissions.includes(p))) {
        return res.status(404).send('Unauthorized')
    }
    next()
}