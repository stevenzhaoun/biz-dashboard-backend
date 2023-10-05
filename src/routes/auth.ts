import { Router } from 'express'
import * as Auth from '../controllers/auth'

const router = Router()

router.post('/login', Auth.login)


export default router