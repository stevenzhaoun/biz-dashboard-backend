import { Router } from 'express'
import * as Users from '../controllers/users'
import { authorize } from '../middlewares/authorization'
import { PERMISSIONS } from '../constants'

const router = Router()

router.get('/', authorize([PERMISSIONS.VIEW_USERS]), Users.getUsers)
router.get('/:id', authorize([PERMISSIONS.VIEW_USERS]), Users.getUserById)
router.post('/', Users.signup)
router.put('/:id', Users.updateUser)
router.delete('/:id', Users.deleteUser)

export default router