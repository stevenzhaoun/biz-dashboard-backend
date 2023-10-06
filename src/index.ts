import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import UsersRouter from './routes/users'
import PermissionRouter from './routes/permission'
import AuthRouter from './routes/auth'
import RoleRouter from './routes/role'
import ProductRouter from './routes/product'
import { authenticate } from './middlewares/authenticate';
const app = express();
const port = 3000

app.use(cors()); // support cors for frontend development
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(authenticate)

app.use('/users', UsersRouter)
app.use('/auth', AuthRouter)
app.use('/roles', RoleRouter)
app.use('/products', ProductRouter)
app.use('/products', ProductRouter)
app.use('/permissions', PermissionRouter)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});