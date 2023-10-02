import express from 'express';
import { PrismaClient } from '@prisma/client'

const app = express();
const port = 3000

const prisma = new PrismaClient();

app.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
        res.json([allUsers]);

});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});