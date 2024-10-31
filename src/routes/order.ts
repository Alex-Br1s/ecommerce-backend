import { Router } from 'express'
import { handleCreateOrder } from '../controllers/order'
import { authenticateToken } from '../middleware/authenticateToken'

const router = Router()

router.post('/user/create/order', authenticateToken, (req, res, next) => {
  handleCreateOrder(req, res).catch(next)
})

export default router
