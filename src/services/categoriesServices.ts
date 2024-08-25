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

export const addCategory = async (categoryEntry: NewCategoryEntry): Promise<CategoryEntry> => {
  try {
    const newCategory = await Category.create(categoryEntry as CreationAttributes<Category>)
    return newCategory
  } catch (error) {
    const errorMessage = error as Error
    throw new Error(`Error al crear una categoria ${errorMessage.message}`)
  }
}

export const updateCategory = async (id: number, categoryEntry: Partial<NewCategoryEntry>): Promise<CategoryEntry | undefined> => {
  try {
    const category = await Category.findByPk(id)
    if (category === null) throw new Error('No se encontro la categoria')
    await category?.update(categoryEntry)
    return category
  } catch (error) {
    const errorMessage = error as Error
    throw new Error(`Error al actualizar la categoria ${errorMessage.message}`)
  }
}
