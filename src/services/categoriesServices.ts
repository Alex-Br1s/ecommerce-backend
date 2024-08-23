import { CreationAttributes } from 'sequelize'
import { Category } from '../models/category.model'
import { CategoryEntry, NewCategoryEntry } from '../types/types'

export const getAllCategories = async (): Promise<CategoryEntry[]> => {
  try {
    const categories = await Category.findAll()
    return categories
  } catch (error) {
    const errorMessage = error as Error
    throw new Error(`Error al obtener las categorias de la base de datos ${errorMessage.message}`)
  }
}

export const addCategory = async (newCategoryEntry: NewCategoryEntry): Promise<CategoryEntry> => {
  try {
    const newCategory = await Category.create(newCategoryEntry as CreationAttributes<Category>)
    return newCategory
  } catch (error) {
    const errorMessage = error as Error
    throw new Error(`Error al crear una categoria ${errorMessage.message}`)
  }
}
