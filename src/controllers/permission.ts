import { Request, Response } from 'express'
import { prisma } from '../client'
import { Permission } from '@prisma/client';
import { PERMISSION_VALUES } from '../constants';

export async function getPermissions(req: Request, res: Response<Permission[]>) {
    const permissions = await prisma.permission.findMany()
    return res.json(permissions)
}