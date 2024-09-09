import { NewCategoryEntry } from '../types/types'

const isString = (value: any): boolean => {
  return typeof value === 'string' && value.length > 0
}

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) throw new Error('El nombre es un texto requerido')
  return nameFromRequest
}

const parseDescription = (descriptionFromRequest: any): string | undefined => {
  if (typeof descriptionFromRequest === 'string') return descriptionFromRequest

  if (descriptionFromRequest !== undefined && !isString(descriptionFromRequest)) {
    throw new Error('La descripción debe ser de tipo texto')
  }
  return descriptionFromRequest
}

export const toNewCategoryEntry = (dateCategory: any): NewCategoryEntry => {
  const newEntry: NewCategoryEntry = {
    categoryName: parseName(dateCategory.categoryName).toLowerCase(),
    description: parseDescription(dateCategory.description)?.toLowerCase()
  }
  return newEntry
}

export const toUpdateCategoryEntry = (dateCategory: any): Partial<NewCategoryEntry> => {
  const updatedEntry: Partial<NewCategoryEntry> = {}
  if (dateCategory.categoryName !== undefined) {
    updatedEntry.categoryName = parseName(dateCategory.categoryName).toLocaleLowerCase()
  }
  if (dateCategory.description !== undefined) {
    updatedEntry.description = parseDescription(dateCategory.description)?.toLocaleLowerCase()
  }
  return updatedEntry
}
