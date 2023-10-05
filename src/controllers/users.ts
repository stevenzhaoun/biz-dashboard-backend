import { Request, Response } from 'express'
import { prisma } from '../client'
import { User } from '@prisma/client';
import { hashSync } from 'bcryptjs'

interface GetUserByIdParams {
    id: string
}

interface RegisterUserBody {
    name: string;
    email: string;
    roleId: number;
    password: string;
}

interface UpdateUserParams {
    id: string;
}

interface UpdateUserBody {
    name: string;
    email: string;
    roleId: number;
}

interface DeleteUserParams {
    id: string;
}

const SALT_ROUNDS = 10

export async function getUserById(req: Request<GetUserByIdParams>, res: Response<User | string>) {

    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!user) {
        return res.status(404).send('Not found')
    }
    return res.status(200).json(user)
}

export async function getUsers(req: Request, res: Response<User[]>) {
    const users = await prisma.user.findMany()
    return res.status(200).json(users)
}

export async function signup(req: Request<any, any, RegisterUserBody>, res: Response<User>) {

    const { email, name, roleId, password } = req.body
    const user = await prisma.user.create({
        data: {
            email,
            name,
            role: {
                connect: {
                    id: roleId
                },
            },
            password: {
                create: {
                    hash: hashSync(password, SALT_ROUNDS)
                }
            }
        }
    })
    return res.status(201).json(user)
}

export async function updateUser(req: Request<UpdateUserParams, any, UpdateUserBody>, res: Response<User | string>) {
    const { email, name, roleId } = req.body
    try {
        const user = await prisma.user.update({
            data: {
                email,
                name,
                roleId
            },
            where: {
                id: Number(req.params.id)
            },

        })
        return res.json(user)
    } catch (e: any) {
        return res.status(500).send(e?.meta?.cause || 'Something went wrong')
    }

}

export async function deleteUser(req: Request<DeleteUserParams>, res: Response) {
    try {

        await prisma.user.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        return res.send(`Successful delete user ${req.params.id}`)
    } catch (e: any) {
        return res.status(500).send(e?.meta?.cause || 'Something went wrong')
    }
}