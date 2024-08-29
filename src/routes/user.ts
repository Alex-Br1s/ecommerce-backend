import { Router } from 'express'
import { handleLoginUser, handleRegisterUser } from '../controllers/users'

const router = Router()

router.post('/register', (req, res, next) => {
  handleRegisterUser(req, res).catch(next)
})

router.post('/login', (req, res, next) => {
  handleLoginUser(req, res).catch(next)
})

/* router.post('/logout', (req, res, next) => {
  handleLogoutUser(req, res).catch(next)
})

router.put('/user/:id/password', (req, res, next) => {
  handleChangePassword(req, res).catch(next)
})

router.get('/users', (req, res, next) => {
  handleGetAllUsers(req, res).catch(next)
})

router.get('/user/:id', (req, res, next) => {
  handleGetOneUser(req, res).catch(next)
})

router.post('/user', (req, res, next) => {
  handleCreateUser(req, res).catch(next)
})

router.put('/user/:id', (req, res, next) => {
  handleUpdateUser(req, res).catch(next)
})

router.delete('/user/:id', (req, res, next) => {
  handleDeleteUser(req, res).catch(next)
})
 */
export default router
