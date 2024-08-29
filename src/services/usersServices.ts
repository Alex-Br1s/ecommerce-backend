import dotenv from 'dotenv'
import { CreationAttributes } from 'sequelize'
import { User } from '../models/user.model'
import { LoginEntry, NewUserEntry, UserEntry } from '../types/types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

const secretKey = process.env.JWT_SECRET

if (!secretKey) throw new Error('JWT_SECRET no está definida en las variables de entorno')

export const registerUser = async (dateUser: NewUserEntry): Promise<Omit<UserEntry, 'password'>> => {
  try {
    const userExists = await User.findOne({ where: { email: dateUser.email } })
    if (userExists) throw new Error('Este correo ya existe, por favor inicie sesion')

    const hashedPassword = await bcrypt.hash(dateUser.password, 10)

    const newUser = {
      firstName: dateUser.firstName,
      lastName: dateUser.lastName,
      email: dateUser.email,
      password: hashedPassword,
      role: dateUser.role
    }
    const newUserResult = await User.create(newUser as CreationAttributes<User>)

    //* Convertimos la instancia de Sequelize en un objeto simple y quitamos el password del obj
    const { password, ...userWithoutPassword } = newUserResult.get({ plain: true })

    return userWithoutPassword
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const loginUser = async (dataLogin: LoginEntry): Promise<any> => {
  try {
    const user = await User.findOne({ where: { email: dataLogin.email } })
    if (!user) throw new Error('Correo o contraseña incorrecto')

    const passwordMatch = await bcrypt.compare(dataLogin.password, user.password)
    if (!passwordMatch) throw new Error('Correo o contraseña incorrecto')

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, {
      expiresIn: '1h'
    })

    const { password: _, ...userWithoutPassword } = user.get({ plain: true })

    return { user: userWithoutPassword, token }
  } catch (error) {
    throw new Error(`Error al querer iniciar sesión ${(error as Error).message}`)
  }
}
