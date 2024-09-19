import { CreationAttributes } from 'sequelize'
import { Category } from '../models/category.model'
import { CategoryEntry, NewCategoryEntry } from '../types/types'
import { ProductCategory } from '../models/productCategory.model'

export const getAllCategories = async (): Promise<CategoryEntry[]> => {
  try {
    const categories = await Category.findAll()
    return categories
  } catch (error) {
    throw new Error(`Error al obtener las categorias ${(error as Error).message}`)
  }
}

export const addCategory = async (categoryEntry: NewCategoryEntry): Promise<CategoryEntry> => {
  try {
    const newCategory = await Category.create(categoryEntry as CreationAttributes<Category>)
    return newCategory
  } catch (error) {
    throw new Error(`Error al crear una categoria ${(error as Error).message}`)
  }
}

export const updateCategory = async (id: number, categoryEntry: Partial<NewCategoryEntry>): Promise<CategoryEntry | undefined> => {
  try {
    const category = await Category.findByPk(id)
    if (category === null) throw new Error('No se encontro la categoria')
    await category?.update(categoryEntry)
    return category
  } catch (error) {
    throw new Error(`Error al actualizar la categoria ${(error as Error).message}`)
  }
}

export const deleteCategory = async (deleteCategoryId: number, newCategoryId?: number): Promise<number> => {
  try {
    // * Obtener todos los productos asociados con la categoría que se desea eliminar
    const associatedProducts = await ProductCategory.findAll({ where: { categoryId: deleteCategoryId } })
    // * Devuelve un array de objetos que indican los productos asociados a la categoría, ej:
    // * [ { productId: 2, categoryId: 10 }, { productId: 4, categoryId: 10 }]

    // * Si hay productos asociados, necesitamos reasignarlos a una nueva categoría antes de eliminar la existente
    if (associatedProducts.length > 0) {
      if (newCategoryId === undefined) {
        // * Si no se proporciona una nueva categoría, se lanza un error
        throw new Error('No se puede eliminar la categoría porque hay productos asociados. Proporcione una nueva categoría para reasignar.')
      }

      if (isNaN(newCategoryId)) throw new Error('ID de nueva categoría inválido.')

      const newCategoryExists = await Category.findByPk(newCategoryId)

      if (!newCategoryExists) throw new Error('La nueva categoria proporcionada no existe')

      // * Reasignar los productos a la nueva categoría
      await ProductCategory.update(
        { categoryId: newCategoryId }, // * Actualizar el categoryId a la nueva categoría proporcionada
        { where: { categoryId: deleteCategoryId, productId: associatedProducts.map(p => p.productId) } }
        // * Condición: donde el categoryId sea el que se quiere eliminar y los productId sean los asociados a esa categoría
      )
    }

    // * Ahora que los productos han sido reasignados (si era necesario), se puede eliminar la categoría
    await Category.destroy({ where: { id: deleteCategoryId } })
    return deleteCategoryId
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
