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
  if (descriptionFromRequest !== undefined && !isString(descriptionFromRequest)) {
    throw new Error('La descripción debe ser de tipo texto')
  }
  return descriptionFromRequest
}

const parseImage = (imageFromRequest: any): string[] => {
  if (!Array.isArray(imageFromRequest)) throw new Error('Las imagenes son requeridas y deben ser un array de imagenes')

  if (imageFromRequest.length > 3) throw new Error('El producto no puede tener mas de 3 imagenes')

  imageFromRequest.forEach((image) => {
    if (!isString(image)) throw new Error('Las imagenes deben ser de tipo texto')
  })

  return imageFromRequest
}

const parseCategoryId = (categoryIdFromRequest: any): number[] => {
  if (!Array.isArray(categoryIdFromRequest)) {
    throw new Error('categoryIds es requerido y debe ser un array de números')
  }
  categoryIdFromRequest.forEach((categoryId) => {
    if (!isNumber(categoryId)) throw new Error('Cada id debe ser un número')
  })
  return categoryIdFromRequest
}

export const toNewProductEntry = (dataProduct: any): NewProductEntry => {
  const newEntry: NewProductEntry = {
    name: parseName(dataProduct.name).toLowerCase(),
    price: parsePrice(dataProduct.price),
    offer: dataProduct.offer,
    salePrice: parsePrice !== null ? (dataProduct.salePrice) : null,
    stock: parseStock(dataProduct.stock),
    description: parseDescription(dataProduct.description)?.toLowerCase(),
    images: parseImage(dataProduct.images),
    categoryId: parseCategoryId(dataProduct.categoryId)
  }
  return newEntry
}

export const toUpdateProductEntry = (dataProduct: any): Partial<NewProductEntry> => {
  const updatedEntry: Partial<NewProductEntry> = {}
  if (dataProduct.name !== undefined) {
    updatedEntry.name = parseName(dataProduct.name).toLowerCase()
  }
  if (dataProduct.price !== undefined) {
    updatedEntry.price = parsePrice(dataProduct.price)
  }
  if (dataProduct.offer !== undefined) {
    updatedEntry.offer = dataProduct.offer
  }
  if (dataProduct.salePrice !== undefined) {
    updatedEntry.salePrice = parsePrice(dataProduct.salePrice)
  }
  if (dataProduct.price !== undefined) {
    updatedEntry.price = parsePrice(dataProduct.price)
  }
  if (dataProduct.stock !== undefined) {
    updatedEntry.stock = parseStock(dataProduct.stock)
  }
  if (dataProduct.description !== undefined) {
    updatedEntry.description = parseDescription(dataProduct.description)?.toLowerCase()
  }
  if (dataProduct.images !== undefined) {
    updatedEntry.images = parseImage(dataProduct.images)
  }
  if (dataProduct.categoryId !== undefined) {
    updatedEntry.categoryId = parseCategoryId(dataProduct.categoryId)
  }
  return updatedEntry
}
