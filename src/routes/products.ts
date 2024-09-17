import { Router } from 'express'
import { handleGetAllProducts, handleGetAllProductsFilters, handleGetOneProduct, handleAddProduct, handleUpdateProduct, handleDeleteOneProduct, handleGetAllProductsStock } from '../controllers/products'
import { authenticateAdmin } from '../middleware/authenticateAdmin'
import { authenticateToken } from '../middleware/authenticateToken'

// ?La advertencia que estás recibiendo se debe a una regla de ESLint (@typescript-eslint/no-misused-promises) que verifica que las funciones pasadas como argumentos en lugares donde se espera un valor void (es decir, sin retorno) no sean promesas.
// ?Cuando se usa async en la función de un controlador en Express, esa función devuelve una promesa, pero Express espera que las funciones de middleware y de manejo de rutas devuelvan void, no promesas.
// ?Antes router.get('/products', handleGetAllProducts) ahora || router.get('/products', (req, res, next) => {handleGetAllProducts(req, res).catch(next)})

const router = Router()

// ? Logica de productos
router.get('/products', (req, res, next) => {
  handleGetAllProducts(req, res).catch(next)
})

router.get('/products/stock', (req, res, next) => {
  handleGetAllProductsStock(req, res).catch(next)
})

router.get('/products/filtered', (req, res, next) => {
  handleGetAllProductsFilters(req, res).catch(next)
})

router.get('/product/:id', (req, res, next) => {
  handleGetOneProduct(req, res).catch(next)
})

router.post('/product/create', authenticateToken, authenticateAdmin, (req, res, next) => {
  handleAddProduct(req, res).catch(next)
})

router.put('/product/edit/:id', (req, res, next) => {
  handleUpdateProduct(req, res).catch(next)
})

router.delete('/product/delete/:id', (req, res, next) => {
  handleDeleteOneProduct(req, res).catch(next)
})
//* categorias: Figuras, Peluches, Llaveros, Funkos, Comics

export default router
