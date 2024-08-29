import { Request, Response } from 'express'
import { toNewUserEntry, validateLoginData } from '../utils/req-body-user'
import { loginUser, registerUser } from '../services/usersServices'

export const handleRegisterUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const dataValidated = toNewUserEntry(req.body)
    const user = await registerUser(dataValidated)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleLoginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const dataValidated = validateLoginData(req.body)
    const loginResponse = await loginUser(dataValidated)
    res.status(200).json(loginResponse)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}
