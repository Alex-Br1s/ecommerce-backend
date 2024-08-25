import { Router } from 'express'
import { handleGetAllProducts, handleGetOneProduct, handleAddProduct, handleDeleteOneProduct, handleUpdateProduct, handleGetAllProductsFilters } from '../controllers/products'
import { handleAddCategory, handleGetAllCategories, handleUpdateCategory } from '../controllers/categories'

const router = Router()

// ?La advertencia que estás recibiendo se debe a una regla de ESLint (@typescript-eslint/no-misused-promises) que verifica que las funciones pasadas como argumentos en lugares donde se espera un valor void (es decir, sin retorno) no sean promesas.
// ?Cuando se usa async en la función de un controlador en Express, esa función devuelve una promesa, pero Express espera que las funciones de middleware y de manejo de rutas devuelvan void, no promesas.
// ?Antes router.get('/products', handleGetAllProducts) ahora || router.get('/products', (req, res, next) => {handleGetAllProducts(req, res).catch(next)})

// ? Logica de productos
router.get('/products', (req, res, next) => {
  handleGetAllProducts(req, res).catch(next)
})

router.get('/products/filtered', (req, res, next) => {
  handleGetAllProductsFilters(req, res).catch(next)
})

//* Hacer el filtrado de todos los productos por categoria
router.get('/product/:id', (req, res, next) => {
  handleGetOneProduct(req, res).catch(next)
})

router.post('/product', (req, res, next) => {
  handleAddProduct(req, res).catch(next)
})

router.put('/product/:id', (req, res, next) => {
  handleUpdateProduct(req, res).catch(next)
})

router.delete('/product/:id', (req, res, next) => {
  handleDeleteOneProduct(req, res).catch(next)
})
//* ------------------------------------------------

// ? Logica de productos con categorias

//* ------------------------------------------------

router.get('/categories', (req, res, next) => {
  handleGetAllCategories(req, res).catch(next)
})

router.post('/category', (req, res, next) => {
  handleAddCategory(req, res).catch(next)
})

router.put('/category/:id', (req, res, next) => {
  handleUpdateCategory(req, res).catch(next)
})

export default router
//* categorias: Figuras, Peluches, Llaveros, Funkos, Comics
