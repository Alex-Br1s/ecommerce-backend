import { NewProductEntry } from '../types/types'

// ? sintaxis difetentes 1
const isString = (value: any): boolean => {
  return typeof value === 'string' && value.length > 0
}
// ? sintaxis difetentes 2
const isNumber = (value: any): value is number => typeof value === 'number'

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('El nombre debe ser de tipo texto requerido')
  }
  return nameFromRequest
}
const parsePrice = (priceFromRequest: any): number => {
  if (!isNumber(priceFromRequest)) {
    throw new Error('El precio debe ser un numero requerido')
  }
  return priceFromRequest
}

const parseStock = (stockFromRequest: any): number => {
  if (!isNumber(stockFromRequest)) {
    throw new Error('El stock debe ser un numero requerido')
  }
  return stockFromRequest
}

const parseDescription = (descriptionFromRequest: any): string | undefined => {
  if (typeof descriptionFromRequest === 'string') return descriptionFromRequest

  if (descriptionFromRequest !== undefined && !isString(descriptionFromRequest)) {
    throw new Error('La descripción debe ser de tipo texto')
  }
  return descriptionFromRequest
}

const parseImage = (imageFromRequest: any): string => {
  if (!isString(imageFromRequest)) {
    throw new Error('La url de la imagen debe ser de tipo texto requerido')
  }
  return imageFromRequest
}

const parseCategoryId = (categoryIdFromRequest: any): number[] => {
  if (!Array.isArray(categoryIdFromRequest)) {
    throw new Error('categoryIds debe ser un array de números')
  }
  categoryIdFromRequest.forEach((categoryId) => {
    if (!isNumber(categoryId)) throw new Error('Cada id debe ser un número')
  })
  return categoryIdFromRequest
}

export const toNewProductEntry = (dateProduct: any): NewProductEntry => {
  const newEntry: NewProductEntry = {
    name: parseName(dateProduct.name),
    price: parsePrice(dateProduct.price),
    stock: parseStock(dateProduct.stock),
    description: parseDescription(dateProduct.description),
    image: parseImage(dateProduct.image),
    categoryId: parseCategoryId(dateProduct.categoryId)
  }
  return newEntry
}

export const toUpdateProductEntry = (dateProduct: any): Partial<NewProductEntry> => {
  const updatedEntry: Partial<NewProductEntry> = {}
  if (dateProduct.name !== undefined) {
    updatedEntry.name = parseName(dateProduct.name)
  }
  if (dateProduct.price !== undefined) {
    updatedEntry.price = parsePrice(dateProduct.price)
  }
  if (dateProduct.stock !== undefined) {
    updatedEntry.stock = parseStock(dateProduct.stock)
  }
  if (dateProduct.description !== undefined) {
    updatedEntry.description = parseDescription(dateProduct.description)
  }
  if (dateProduct.image !== undefined) {
    updatedEntry.image = parseImage(dateProduct.image)
  }
  if (dateProduct.categoryId !== undefined) {
    updatedEntry.categoryId = parseCategoryId(dateProduct.categoryId)
  }
  return updatedEntry
}
