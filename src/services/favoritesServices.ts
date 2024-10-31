import { Favorite } from '../models/favorite.model'
import { Product } from '../models/product.model'
import { CreationAttributes } from 'sequelize'
import { ProductEntry } from '../types/types'

export const addFavorite = async (userId: number, productId: number): Promise<string> => {
  try {
    const existingFavorite = await Favorite.findOne({ where: { userId, productId } })
    if (existingFavorite) {
      return 'El producto ya estaba en favoritos'
    }
    const favorite = { userId, productId }
    await Favorite.create(favorite as CreationAttributes<Favorite>)
    return 'Se agrego el producto a favoritos'
  } catch (error) {
    throw new Error(`Error al agregar productos en favoritos: ${(error as Error).message}`)
  }
}

export const getFavorites = async (userId: number): Promise<ProductEntry[]> => {
  try {
    const userFavorites = await Favorite.findAll({ where: { userId } })
    if (!userFavorites.length) throw new Error('No se encontraron productos favoritos')
    const productsId = userFavorites.map(fav => fav.productId)
    const productsFavorites = await Product.findAll({ where: { id: productsId } })
    return productsFavorites
  } catch (error) {
    throw new Error(`Error al obtener los productos favoritos: ${(error as Error).message}`)
  }
}

export const deleteFavorites = async (userId: number, productId: number): Promise<string> => {
  try {
    const productRemoved = await Favorite.destroy({ where: { userId, productId } })
    return productRemoved ? 'Se elimino el producto de favoritos' : 'No se encontró el producto en los favoritos del usuario'
  } catch (error) {
    throw new Error(`Error al eliminar un producto de favorito: ${(error as Error).message}`)
  }
}
