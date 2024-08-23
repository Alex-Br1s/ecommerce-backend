import { NewCategoryEntry } from '../types/types'

const isString = (value: any): value is string => typeof value === 'string' && value.length > 0

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) throw new Error('El nombre es un texto requerido')
  return nameFromRequest
}

const parseDescription = (descriptionFromRequest: any): string => {
  if (descriptionFromRequest !== undefined && !isString(descriptionFromRequest)) {
    throw new Error('La descripción debe ser de tipo texto')
  }
  return descriptionFromRequest
}

const toNewCategoryEntry = (dateCategory: any): NewCategoryEntry => {
  const newEntry: NewCategoryEntry = {
    categoryName: parseName(dateCategory.categoryName),
    description: parseDescription(dateCategory.description)
  }
  return newEntry
}

export default toNewCategoryEntry
