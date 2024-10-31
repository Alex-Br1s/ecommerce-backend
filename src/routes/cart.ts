import { Router } from 'express'
import { handleAddCart, handleClearCart, handleDeleteProduct, handleGetCart } from '../controllers/carts'
import { authenticateToken } from '../middleware/authenticateToken'

const router = Router()

router.get('/user/cart', authenticateToken, (req, res, next) => {
  handleGetCart(req, res).catch(next)
})

router.post('/user/cart/add/product', authenticateToken, (req, res, next) => {
  handleAddCart(req, res).catch(next)
})

router.delete('/user/cart/delete/product/:id', authenticateToken, (req, res, next) => {
  handleDeleteProduct(req, res).catch(next)
})

router.delete('/user/cart/clear', authenticateToken, (req, res, next) => {
  handleClearCart(req, res).catch(next)
})

export default router
