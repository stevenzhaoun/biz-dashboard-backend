import { Request, Response } from 'express'
import { prisma } from '../client'
import { Role } from '@prisma/client';
import { PERMISSION_VALUES } from '../constants';

interface GetRoleParams {
    id: number;
}

interface CreateRoleBody {
    name: string;
    permissions: PERMISSION_VALUES[]
}

interface DeleteRoleParams {
    id: number
}

interface UpdateRoleParams {
    id: number
}

interface UpdateRoleBody {
    name: string;
    permissions: PERMISSION_VALUES[]
}

export async function getRoles(req: Request, res: Response<Role[]>) {
    const roles = await prisma.role.findMany()
    return res.json(roles)
}

export async function getRole(req: Request<GetRoleParams>, res: Response<Role>) {

    const { id } = req.params;
    const role = await prisma.role.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            permissions: true
        }
    })

    if (!role) {
        return res.status(404)
    }
    return res.json(role)
}

export async function createRole(req: Request<any, any, CreateRoleBody>, res: Response<Role>) {
    const { name, permissions } = req.body

    const role = await prisma.role.create({
        data: {
            name,
            permissions: {
                connect: permissions.map(p => ({ id: p }))
            }
        },
        include: {
            permissions: {

            }
        }
    })
    return res.json(role)
}

export async function updateRole(req: Request<UpdateRoleParams, any, UpdateRoleBody>, res: Response<Role>) {
    const { id } = req.params
    try {
        const role = await prisma.role.update({
            where: {
                id: Number(id)
            },
            data: {
                name: req.body.name,
                permissions: {
                    set: req.body.permissions.map(p => ({id: p}))
                }
            }
        })
        res.json(role)
    } catch (e: any) {
        console.log(e)
        return res.status(500).send(e?.meta?.cause || 'Something went wrong')
    }
}

export async function deleteRole(req: Request<DeleteRoleParams>, res: Response) {
    const { id } = req.params

    try {
        await prisma.role.delete({
            where: {
                id: Number(id)
            }
        })
        return res.send(`Successful delete role ${req.params.id}`)
    } catch (e: any) {
        console.log(e)
        return res.status(500).send(e?.meta?.cause || 'Something went wrong')
    }

}