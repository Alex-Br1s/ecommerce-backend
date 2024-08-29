import { Router } from 'express'
import { handleGetAllCategories, handleAddCategory, handleUpdateCategory, handleDeleteCategory } from '../controllers/categories'

const router = Router()

router.get('/categories', (req, res, next) => {
  handleGetAllCategories(req, res).catch(next)
})

router.post('/category', (req, res, next) => {
  handleAddCategory(req, res).catch(next)
})

router.put('/category/:id', (req, res, next) => {
  handleUpdateCategory(req, res).catch(next)
})

// ?Ruta para eliminar una categoria disfrasada de patch
router.patch('/category/:id', (req, res, next) => {
  handleDeleteCategory(req, res).catch(next)
})

export default router
