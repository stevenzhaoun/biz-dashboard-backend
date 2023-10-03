import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import UsersRouter from './routes/users'
const app = express();
const port = 3000

app.use(cors()); // support cors for frontend development
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use('/users', UsersRouter)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});