import { CreationAttributes } from 'sequelize'
import { Product } from '../models/product.model'
import { ProductEntry, NewProductEntry } from '../types/types'
import { ProductCategory } from '../models/productCategory.model'
import { Category } from '../models/category.model'

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products = await Product.findAll()
    return products
  } catch (error) {
    const errorMessage = error as Error
    throw new Error(`Error al obtener los productos de la base de datos ${errorMessage.message}`)
  }
}

export const getOneProduct = async (id: number): Promise<ProductEntry | any> => {
  try {
    const resultProduct = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          through: { attributes: [] } // Esto omite los campos intermedios de ProductCategory
        }
      ]
    })
    if (resultProduct == null) throw new Error('El producto no existe')
    return resultProduct
  } catch (error) {
    const errorMessage = error as Error
    throw new Error(errorMessage.message)
  }
}

export const addNewProduct = async (newProductEntry: NewProductEntry): Promise<ProductEntry> => {
  try {
    const { categoryId, ...productData } = newProductEntry
    // ? categoryId === [2] o mas ids de categorias [2, 4]
    const newProduct = await Product.create(productData as CreationAttributes<Product>)
    if (categoryId !== undefined && Array.isArray(categoryId)) {
      const productCategories = categoryId.map((id) => ({
        productId: newProduct.id,
        categoryId: id
      }))
      // ? productCategories === [ { productId: 36, categoryId: 2 }, { productId: 36, categoryId: 4 } ]
      await Promise.all(
        productCategories.map(async (productCategory) => // ? asi quedaria luego del map { productId: 36, categoryId: 2 } y esto se crea en la db mediante el create
          await ProductCategory.create(productCategory as CreationAttributes<ProductCategory>)
        )
      )
    }
    return newProduct
  } catch (error) {
    const errorMessage = error as Error
    throw new Error(errorMessage.message)
  }
}

export const updateProduct = async (id: number, updateProductEntry: Partial<NewProductEntry>): Promise<ProductEntry | null> => {
  try {
    //* Buscar el producto a actualizar
    const productToUpdate = await Product.findByPk(id)
    if (productToUpdate == null) {
      throw new Error('Producto no encontrado')
    }

    //* Actualizar los datos del producto
    await productToUpdate.update(updateProductEntry)

    //* Si hay categorías para actualizar
    if ((updateProductEntry.categoryId != null) && updateProductEntry.categoryId.length > 0) {
      //* Eliminar las asociaciones existentes
      await ProductCategory.destroy({ where: { productId: id } })

      //* Mapear el array de id de categoryId:[2, 4] y por cada elemento devolver:
      //* [{ productId: 36, categoryId: 2 }, { productId: 36, categoryId: 4 }]
      const newProductCategories = updateProductEntry.categoryId.map(categoryId => ({
        productId: id,
        categoryId
      }))

      //* Mapear ese array de objs: [{ productId: 36, categoryId: 2 }, { productId: 36, categoryId: 4 }]
      //* Y por cada objeto crear una nueva asociación en el modelo ProductCategory que recibe un obj: { productId: 36, categoryId: 2 }
      await Promise.all(
        newProductCategories.map(async (category) =>
          await ProductCategory.create(category as CreationAttributes<ProductCategory>)
        )
      )
    }

    return productToUpdate
  } catch (error) {
    const errorMessage = error as Error
    throw new Error(errorMessage.message)
  }
}

export const deleteOneProduct = async (id: number): Promise<number> => {
  try {
    const resultProduct = await Product.destroy({ where: { id } })
    // ? destroy devuelve 1 === eliminado & 0 === no eliminado x x motivo
    return resultProduct
  } catch (error) {
    const errorMessage = error as Error
    throw new Error(errorMessage.message)
  }
}
