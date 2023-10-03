import { prisma } from '../client'

const main = async () => {
    return await prisma.role.create({
        data: {
            name: 'admin',
            permissions: {
                connect: [1, 2, 3, 4, 5, 6, 7, 8].map(id => ({ id }))
            }
        },
        include: {
            permissions: true
        }
    })
}

main()

