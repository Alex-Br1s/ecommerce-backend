import { Router } from 'express'
import { handleAddCart, handleClearCart, handleDeleteProduct, handleGetCart } from '../controllers/carts'
import { authenticateToken } from '../middleware/authenticateToken'

const router = Router()

router.get('/user/cart', authenticateToken, (req, res, next) => {
  console.log('GET /user/getCart ejecutado')
  handleGetCart(req, res).catch(next)
})

router.post('/user/addToCart', authenticateToken, (req, res, next) => {
  handleAddCart(req, res).catch(next)
})

router.delete('/user/cart/:id', authenticateToken, (req, res, next) => {
  handleDeleteProduct(req, res).catch(next)
})

router.delete('/user/clear/cart', authenticateToken, (req, res, next) => {
  handleClearCart(req, res).catch(next)
})

export default router
