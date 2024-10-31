import { CreationAttributes, Op } from 'sequelize'
import { Product } from '../models/product.model'
import { ProductEntry, NewProductEntry } from '../types/types'
import { ProductCategory } from '../models/productCategory.model'
import { Category } from '../models/category.model'

export const getAllProducts = async (): Promise<ProductEntry[]> => {
  try {
    const products = await Product.findAll(
      {
        where: {
          stock: { [Op.gt]: 0 }// ?Eso es igual a > 0 es decir evalua la condición que el stock deber ser mayor a 0
        },
        include: [{ model: Category, attributes: ['categoryName'], through: { attributes: [] } }]
      }
    )
    return products
  } catch (error) {
    throw new Error(`Error al obtener los productos ${(error as Error).message}`)
  }
}

export const getAllProductsStock = async (): Promise<ProductEntry[] | undefined> => {
  try {
    const productsOutOfStock = await Product.findAll({ where: { stock: 0 } })
    return productsOutOfStock
  } catch (error) {
    throw new Error(`Error al obtener los productos sin stock: ${(error as Error).message}`)
  }
}

export const getAllProductsFilters = async (query: any): Promise<Product[]> => {
  const { categorie, sort } = query
  try {
    let query = {}
    if (categorie) {
      const categoriesArray: string[] = Array.isArray(categorie) ? categorie : categorie.split(',')
      // ?categoriesArray === ['funkos'] transforma 'funkos' en ['funkos']

      //* categories se utiliza para acceder a las propiedades del modelo Category cuando estás realizando una consulta desde la perspectiva del modelo Product.
      //* Ejemplo: '$categories.categoryName$' para acceder a categoryName en el modelo Category.
      query = {
        '$categories.categoryName$': { // ?$categories.categoryName$' para acceder a categoryName en el modelo Category
          [Op.in]: categoriesArray // ?Op.in se utiliza para comprobar si un valor está en una lista de valores
        }
      }
    }

    // Ejecutar la consulta con filtros y ordenación
    const products = await Product.findAll({
      where: query,
      include: [{
        model: Category,
        through: { attributes: [] }, // Excluye los atributos de la tabla intermedia productCategory
        attributes: ['categoryName'] // Incluye solo los atributos necesarios de Category
      }], //* order recibe un array de array donde el primer elemento del sub array es la columna a order en este caso 'price' y el segundo la forma en que se ordena
      order: sort === 'price_asc' ? [['price', 'ASC']] : [['price', 'DESC']]
    })

    return products
  } catch (error) {
    throw new Error(`Error al obtener los productos filtrados y/o ordenados ${(error as Error).message}`)
  }
}
export const getOneProduct = async (id: number): Promise<ProductEntry | any> => {
  try {
    const resultProduct = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ['categoryName'],
          through: { attributes: [] } // Esto omite los campos intermedios de ProductCategory
        }
      ]
    })
    if (resultProduct == null) throw new Error('El producto no existe')
    return resultProduct
  } catch (error) {
    throw new Error(`Error al obtener el usuario por id ${(error as Error).message}`)
  }
}

export const createProduct = async (newProductEntry: NewProductEntry): Promise<ProductEntry> => {
  try {
    const { categoryId, ...productData } = newProductEntry
    // ? categoryId === [2] o mas ids de categorias [2, 4]

    if (newProductEntry.salePrice && newProductEntry.salePrice > newProductEntry.price) throw new Error('El precio de oferta no puede ser mayor al precio base')

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
    const product = await Product.findOne({ where: { id: newProduct.id }, include: [{ model: Category, attributes: ['categoryName'], through: { attributes: [] } }] })
    if (!product) throw new Error('No se encontro el nuevo producto')
    return product
  } catch (error) {
    throw new Error(`Error al crear un nuevo producto ${(error as Error).message}`)
  }
}

export const updateProduct = async (id: number, updateProductEntry: Partial<NewProductEntry>): Promise<ProductEntry> => {
  try {
    //* Buscar el producto a actualizar
    const productToUpdate = await Product.findByPk(id)
    if (!productToUpdate) throw new Error('Producto no encontrado')

    //* Actualizar los datos del producto
    await productToUpdate.update(updateProductEntry)

    //* Si hay categorías para actualizar
    if (updateProductEntry.categoryId && updateProductEntry.categoryId.length > 0) {
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
    throw new Error((error as Error).message)
  }
}

export const deleteOneProduct = async (id: number): Promise<number> => {
  try {
    const resultProduct = await Product.destroy({ where: { id } })
    // ? destroy devuelve 1 === eliminado & 0 === no eliminado x x motivo
    return resultProduct
  } catch (error) {
    throw new Error(`Error al eliminar un producto ${(error as Error).message}`)
  }
}
