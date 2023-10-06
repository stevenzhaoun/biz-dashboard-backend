import { Request, Response } from 'express'
import { prisma } from '../client'
import { Product } from '@prisma/client';

interface GetProductParams {
    id: number;
}

interface CreateProductBody {
    title: string;
    description: string;
    price: number;
}

interface DeleteProductParams {
    id: number
}

interface UpdateProductParams {
    id: number
}

interface UpdateProductBody {
    title: string;
    description: string;
    price: number;
}

export async function getProducts(req: Request, res: Response<Product[]>) {
    const roles = await prisma.product.findMany({
        orderBy: [
            {
                id: 'asc'
            }
        ]
    })
    return res.json(roles)
}

export async function getProduct(req: Request<GetProductParams>, res: Response<Product>) {

    const { id } = req.params;
    const role = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!role) {
        return res.status(404)
    }
    return res.json(role)
}

export async function createProduct(req: Request<any, any, CreateProductBody>, res: Response<Product>) {
    const { title, description, price } = req.body
    const product = await prisma.product.create({
        data: {
            title,
            description,
            price
        }
    })
    return res.json(product)
}

export async function updateProduct(req: Request<UpdateProductParams, any, UpdateProductBody>, res: Response<Product>) {
    const { id } = req.params
    try {
        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
            }
        })
        res.json(product)
    } catch (e: any) {
        console.log(e)
        return res.status(500).send(e?.meta?.cause || 'Something went wrong')
    }
}

export async function deleteProduct(req: Request<DeleteProductParams>, res: Response) {
    const { id } = req.params

    try {
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
        return res.send(`Successful delete product ${req.params.id}`)
    } catch (e: any) {
        console.log(e)
        return res.status(500).send(e?.meta?.cause || 'Something went wrong')
    }

}