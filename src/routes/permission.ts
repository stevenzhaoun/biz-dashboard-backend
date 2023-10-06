import { Router } from 'express'
import * as Permission from '../controllers/permission'
import { authorize } from '../middlewares/authorization'
import { PERMISSIONS } from '../constants'

const router = Router()

router.get('/', authorize([PERMISSIONS.VIEW_ROLES]), Permission.getPermissions)

export default router