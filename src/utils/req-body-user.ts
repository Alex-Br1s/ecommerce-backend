import { LoginEntry, NewUserEntry } from '../types/types'

const isString = (value: any): boolean => {
  return typeof value === 'string' && value.length > 0
}

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) throw new Error('El nombre es un texto requerido')
  return nameFromRequest
}

const parseLastName = (lastNameFromRequest: any): string => {
  if (!isString(lastNameFromRequest)) throw new Error('El nombre es un texto requerido')
  return lastNameFromRequest
}

const parseEmail = (emailFromRequest: any): string => {
  if (!isString(emailFromRequest) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFromRequest)) {
    throw new Error('Por favor ingrese un email valido')
  }
  return emailFromRequest
}

const parsePassword = (passwordFromRequest: any): string => {
  if (!isString(passwordFromRequest) && passwordFromRequest.test(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
    throw new Error('Asegurese que su contraseña tenga al menos 8 caracteres, incluya al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
  }
  return passwordFromRequest
}

const parseRole = (passwordFromRequest: any): string => {
  if (!isString(passwordFromRequest)) {
    throw new Error('Asegurese de que el role sea de tipo texto el role no va xd')
  }
  return passwordFromRequest
}

export const toNewUserEntry = (dateUser: any): NewUserEntry => {
  const validateData: NewUserEntry = {
    firstName: parseName(dateUser.firstName),
    lastName: parseLastName(dateUser.lastName),
    email: parseEmail(dateUser.email),
    password: parsePassword(dateUser.password),
    role: parseRole(dateUser.role)
  }
  return validateData
}

export const validateLoginData = (dateUser: any): LoginEntry => {
  const validateData: LoginEntry = {
    email: parseEmail(dateUser.email),
    password: parsePassword(dateUser.password)
  }
  return validateData
}
