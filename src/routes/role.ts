import { Router } from 'express'
import * as Role from '../controllers/role'
import { authorize } from '../middlewares/authorization'
import { PERMISSIONS } from '../constants'

const router = Router()

router.get('/', authorize([PERMISSIONS.VIEW_ROLES]), Role.getRoles)
router.get('/:id', authorize([PERMISSIONS.VIEW_ROLES]), Role.getRole)
router.post('/', authorize([PERMISSIONS.EDIT_ROLES]), Role.createRole)
router.delete('/:id', authorize([PERMISSIONS.EDIT_ROLES]), Role.deleteRole)
router.put('/:id', authorize([PERMISSIONS.EDIT_ROLES]), Role.updateRole)

export default router