import { Router } from 'express'
import * as Users from '../controllers/users'

const router = Router()

router.get('/', Users.getUsers)
router.get('/:id', Users.getUserById)
router.post('/', Users.signup)
router.put('/:id', Users.updateUser)
router.delete('/:id', Users.deleteUser)

export default router