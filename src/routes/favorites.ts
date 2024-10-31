import { Router } from 'express'
import { authenticateToken } from '../middleware/authenticateToken'
import { handleAddFavorite, handleDeleteFavorite, handleGetFavorites } from '../controllers/favorites'

const router = Router()

router.post('/user/add/favorite/:id', authenticateToken, (req, res, next) => {
  handleAddFavorite(req, res).catch(next)
})

router.get('/user/favorites', authenticateToken, (req, res, next) => {
  handleGetFavorites(req, res).catch(next)
})

router.delete('/user/delete/favorite/:id', authenticateToken, (req, res, next) => {
  handleDeleteFavorite(req, res).catch(next)
})

export default router
