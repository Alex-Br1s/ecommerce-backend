import { ChangePasswordEntry, LoginEntry, NewUserEntry, updateUserEntry } from '../types/types'

const isString = (value: any): boolean => {
  return typeof value === 'string' && value.length > 0
}

const isNumber = (value: any): value is number => typeof value === 'number'

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) throw new Error('El nombre es un texto requerido')
  return nameFromRequest
}

const parseLastName = (lastNameFromRequest: any): string => {
  if (!isString(lastNameFromRequest)) throw new Error('El nombre es un texto requerido')
  return lastNameFromRequest
}

const parseProfilePicture = (profilePictureFromRequest: any): string => {
  if (!isString(profilePictureFromRequest)) throw new Error('La imagen es una url requerida')
  return profilePictureFromRequest
}

const parseEmail = (emailFromRequest: any): string => {
  if (!isString(emailFromRequest) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFromRequest)) {
    throw new Error('Por favor ingrese un email valido')
  }
  return emailFromRequest
}

const parsePassword = (passwordFromRequest: any): string => {
  if (!isString(passwordFromRequest) || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwordFromRequest)) {
    throw new Error('Asegurese que su contraseña tenga al menos 8 caracteres, incluya al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
  }
  return passwordFromRequest
}

const parseFavorites = (favoritesIdsFromRequest: any): number[] => {
  if (favoritesIdsFromRequest === undefined) return []

  if (!Array.isArray(favoritesIdsFromRequest)) throw new Error('Los ids de los productos en favoritos deber ser un array')
  favoritesIdsFromRequest.forEach(favoriteId => {
    if (!isNumber(favoriteId)) throw new Error('El id debe ser un numero')
  })
  return favoritesIdsFromRequest
}

export const toNewUserEntry = (dataUser: any): NewUserEntry => {
  const validateData: NewUserEntry = {
    firstName: parseName(dataUser.firstName).toLowerCase(),
    lastName: parseLastName(dataUser.lastName).toLowerCase(),
    profilePicture: parseProfilePicture(dataUser.profilePicture),
    email: parseEmail(dataUser.email),
    password: parsePassword(dataUser.password),
    role: dataUser.role
  }
  return validateData
}

export const toUpdateUserEntry = (dataUser: any): Partial<updateUserEntry> => {
  const validateData: Partial<updateUserEntry> = {}
  if (dataUser.firstName !== undefined) {
    validateData.firstName = parseName(dataUser.firstName)
  }
  if (dataUser.lastName !== undefined) {
    validateData.lastName = parseLastName(dataUser.lastName)
  }
  if (dataUser.profilePicture !== undefined) {
    validateData.profilePicture = parseProfilePicture(dataUser.profilePicture)
  }
  return validateData
}

export const validateLoginData = (dataUser: any): LoginEntry => {
  const validateData: LoginEntry = {
    email: parseEmail(dataUser.email),
    password: parsePassword(dataUser.password),
    favorites: dataUser.favorites ? parseFavorites(dataUser.favorites) : []
  }
  return validateData
}

export const validateChangePassword = (dataUser: any): ChangePasswordEntry => {
  const validateData: ChangePasswordEntry = {
    email: parseEmail(dataUser.email),
    password: parsePassword(dataUser.password),
    newPassword: parsePassword(dataUser.newPassword)
  }
  return validateData
}
