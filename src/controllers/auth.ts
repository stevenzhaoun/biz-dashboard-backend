
import { Request, Response } from 'express'
import { prisma } from '../client';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { config } from '../config';


interface LoginBody {
    email: string;
    password: string;
}

export async function login(req: Request<unknown, unknown, LoginBody>, res: Response) {
    const { email, password } = req.body

    const user = await prisma.user.findFirst({
        where: {
            email
        },
        include: {
            password: true,
            role: true
        }
    })

    if (!user || !user.password) {
        return res.status(404).send('No user found')
    }

    if (!compareSync(password, user.password?.hash)) {
        return res.status(400).send('Wrong password')
    }

    const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.roleId
    }

    const token = sign(userData, config.jwtSecret, {
        expiresIn: config.tokenExpireTime,
    });

    const userResp = {
        ...userData,
        token: `Bearer ${token}`
    }

    return res.status(200).json({ user: userResp })
}