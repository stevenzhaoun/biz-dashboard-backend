import { Router } from 'express'
import * as Product from '../controllers/product'
import { authorize } from '../middlewares/authorization'
import { PERMISSIONS } from '../constants'

const router = Router()

router.get('/', authorize([PERMISSIONS.VIEW_PRODUCTS]), Product.getProducts)
router.get('/:id', authorize([PERMISSIONS.VIEW_PRODUCTS]), Product.getProduct)
router.post('/', authorize([PERMISSIONS.EDIT_PRODUCTS]), Product.createProduct)
router.delete('/:id', authorize([PERMISSIONS.EDIT_PRODUCTS]), Product.deleteProduct)
router.put('/:id', authorize([PERMISSIONS.EDIT_PRODUCTS]), Product.updateProduct)

export default router