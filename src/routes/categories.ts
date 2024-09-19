import { Router } from 'express'
import { handleGetAllCategories, handleAddCategory, handleUpdateCategory, handleDeleteCategory } from '../controllers/categories'
import { authenticateToken } from '../middleware/authenticateToken'
import { checkAdminRole } from '../middleware/checkAdminRole'

const router = Router()

router.get('/categories', (req, res, next) => {
  handleGetAllCategories(req, res).catch(next)
})

router.post('/category/create', authenticateToken, checkAdminRole, (req, res, next) => {
  handleAddCategory(req, res).catch(next)
})

router.put('/category/edit/:id', authenticateToken, checkAdminRole, (req, res, next) => {
  handleUpdateCategory(req, res).catch(next)
})

// ?Ruta para eliminar una categoria disfrasada de patch
router.patch('/category/delete/:id', authenticateToken, checkAdminRole, (req, res, next) => {
  handleDeleteCategory(req, res).catch(next)
})

export default router
