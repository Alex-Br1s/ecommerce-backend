import dotenv from 'dotenv'
import { CreationAttributes } from 'sequelize'
import { User } from '../models/user.model'
import { ChangePasswordEntry, LoginEntry, NewUserEntry, updateUserEntry, UserEntry } from '../types/types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Favorite } from '../models/favorite.model'
dotenv.config()

const secretKey = process.env.JWT_SECRET

if (!secretKey) throw new Error('JWT_SECRET no está definida en las variables de entorno')

export const registerUser = async (dateUser: NewUserEntry): Promise<Omit<UserEntry, 'password'>> => {
  try {
    const userExists = await User.findOne({ where: { email: dateUser.email } })
    if (userExists) {
      const error = new Error('Este correo ya existe, por favor inicie sesion')
      error.name = 'AuthRegisterError'
      throw error
    }

    const hashedPassword = await bcrypt.hash(dateUser.password, 10)

    const newUser = {
      firstName: dateUser.firstName,
      lastName: dateUser.lastName,
      profilePicture: dateUser.profilePicture,
      email: dateUser.email,
      password: hashedPassword,
      role: dateUser.role
    }
    const newUserResult = await User.create(newUser as CreationAttributes<User>)

    //* Convertimos la instancia de Sequelize en un objeto simple y quitamos el password del obj
    const { password, ...userWithoutPassword } = newUserResult.get({ plain: true })

    return userWithoutPassword
  } catch (error) {
    (error as Error).name = (error as Error).message || 'AuthRegisterError'
    throw error
  }
}

export const loginUser = async (dataLogin: LoginEntry): Promise<{ user: Omit<UserEntry, 'password'>, token: string }> => {
  try {
    const user = await User.findOne({ where: { email: dataLogin.email } })
    if (!user) {
      const error = new Error('Correo o contraseña incorrecto')
      error.name = 'AuthLoginError'
      throw error
    }
    const passwordMatch = await bcrypt.compare(dataLogin.password, user.password)
    if (!passwordMatch) {
      const error = new Error('Correo o contraseña incorrecto')
      error.name = 'AuthLoginError'
      throw error
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, {
      expiresIn: '1d'
    })

    //* migrar los favoritos del localStorage a la db
    if (dataLogin.favorites && dataLogin.favorites.length > 0) {
      const productsFavorites = dataLogin.favorites.map((productId: number) => ({
        userId: user.id,
        productId
      }))

      await Favorite.bulkCreate(productsFavorites as Array<CreationAttributes<Favorite>>)
    }
    const { password: _, ...userWithoutPassword } = user.get({ plain: true })

    return { user: userWithoutPassword, token }
  } catch (error) {
    (error as Error).name = (error as Error).name || 'AuthLoginError'
    throw error
  }
}

export const getOneUser = async (userId: number): Promise<UserEntry | null> => {
  try {
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } })
    return user
  } catch (error) {
    throw new Error(`Error al obtener un usuario ${(error as Error).message}`)
  }
}

export const getAllUsers = async (): Promise<UserEntry[] | null> => {
  try {
    const allUsers = await User.findAll({ where: { isActive: true }, attributes: { exclude: ['password'] } })
    return allUsers
  } catch (error) {
    throw new Error(`Error al obtener todos los usuarios ${(error as Error).message}`)
  }
}

export const getAllUsersDesactivated = async (): Promise<UserEntry[] | null> => {
  try {
    const users = await User.findAll({ where: { isActive: false }, attributes: { exclude: ['password'] } })
    return users
  } catch (error) {
    throw new Error(`Error al obtener los usuarios desactivados: ${(error as Error).message}`)
  }
}

export const changePassword = async (userId: number, newData: ChangePasswordEntry): Promise<{ user: Omit<UserEntry, 'password'> }> => {
  try {
    const user = await User.findByPk(userId)
    if (!user) throw new Error('Usuario no encontrado')

    const { email, password } = user.get({ plain: true })
    if (email !== newData.email) throw new Error('El correo electronico no coincide')

    const passwordMatch = await bcrypt.compare(newData.password, password)

    if (!passwordMatch) throw new Error('La contraseña actual no coincide')

    if (newData.password === newData.newPassword) throw new Error('La nueva contraseña no puede ser la misma que la actual')

    const hashedPassword = await bcrypt.hash(newData.newPassword, 10)

    await user.update({ password: hashedPassword })

    const { password: _, ...userWithoutPassword } = user.get({ plain: true })

    return { user: userWithoutPassword }
  } catch (error) {
    throw new Error(`Error al cambiar la contraseña: ${(error as Error).message}`)
  }
}

export const updateUser = async (userId: number, dataUser: Partial<updateUserEntry>): Promise<Partial<updateUserEntry>> => {
  try {
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } })
    if (!user) throw new Error('No se encontro el usuario a editar')
    await user.update(dataUser)
    return user
  } catch (error) {
    throw new Error(`Error al actualizar un usuario: ${(error as Error).message}`)
  }
}

export const desactiveUser = async (userId: number): Promise<UserEntry> => {
  try {
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } })
    if (!user) throw new Error('No se encontro el usuario a eliminar')
    await user.update({ isActive: false })
    return user
  } catch (error) {
    throw new Error(`Error al querer eliminar el usuario: ${(error as Error).message}`)
  }
}

export const activeUser = async (userId: number): Promise<UserEntry> => {
  try {
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } })
    if (!user) throw new Error('No se encontro el usuario a activar')
    await user.update({ isActive: true })
    return user
  } catch (error) {
    throw new Error(`Error al querer activar el usuario: ${(error as Error).message}`)
  }
}
