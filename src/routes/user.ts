import { Router } from 'express'
import { handleActiveUser, handleChangePassword, handleDesactiveUser, handleGetAllUsers, handleGetAllUsersDesactivated, handleGetOneUser, handleLoginUser, handleRegisterUser, handleUpdateUser } from '../controllers/users'
import { authenticateToken } from '../middleware/authenticateToken'
import { checkAdminRole } from '../middleware/checkAdminRole'

const router = Router()

router.post('/user/register', (req, res, next) => {
  handleRegisterUser(req, res).catch(next)
})

router.post('/user/login', (req, res, next) => {
  handleLoginUser(req, res).catch(next)
})

router.put('/user/change/password', authenticateToken, (req, res, next) => {
  handleChangePassword(req, res).catch(next)
})

router.get('/user', authenticateToken, (req, res, next) => {
  handleGetOneUser(req, res).catch(next)
})

router.put('/user/edit', authenticateToken, (req, res, next) => {
  handleUpdateUser(req, res).catch(next)
})
//! RUTAS DE ADMINISTRADOR

router.get('/users', authenticateToken, checkAdminRole, (req, res, next) => {
  handleGetAllUsers(req, res).catch(next)
})

router.get('/users/desactivated', authenticateToken, checkAdminRole, (req, res, next) => {
  handleGetAllUsersDesactivated(req, res).catch(next)
})

router.delete('/user/desactive/:id', authenticateToken, checkAdminRole, (req, res, next) => {
  handleDesactiveUser(req, res).catch(next)
})

router.patch('/user/active/:id', authenticateToken, checkAdminRole, (req, res, next) => {
  handleActiveUser(req, res).catch(next)
})

/* router.get('/user/:id/orders', (req, res, next) => {
  handleAllOrders(req, res).catch(next)
})

router.post('/user/:id/order', (req, res, next) => {
  handleCreateOrder(req, res).catch(next)
})
 */
export default router
