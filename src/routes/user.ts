import { Router } from 'express'
import { handleActiveUser, handleChangePassword, handleDesactiveUser, handleGetAllUsers, handleGetOneUser, handleLoginUser, handleRegisterUser, handleUpdateUser } from '../controllers/users'

const router = Router()

router.post('/user/register', (req, res, next) => {
  handleRegisterUser(req, res).catch(next)
})

router.post('/user/login', (req, res, next) => {
  handleLoginUser(req, res).catch(next)
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

router.put('/user/:id', (req, res, next) => {
  handleUpdateUser(req, res).catch(next)
})

router.delete('/user/desactive/:id', (req, res, next) => {
  handleDesactiveUser(req, res).catch(next)
})

router.patch('/user/active/:id', (req, res, next) => {
  handleActiveUser(req, res).catch(next)
})

/* router.post('/user', (req, res, next) => {
  handleCreateUser(req, res).catch(next)
  })
*/
export default router
