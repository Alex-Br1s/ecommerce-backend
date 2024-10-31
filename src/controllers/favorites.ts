import { Request, Response } from 'express'
import { addFavorite, deleteFavorites, getFavorites } from '../services/favoritesServices'

export const handleAddFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    if (!userId) throw new Error('ID del usuario no proporcionado o inválido')
    const addFav = await addFavorite(userId, +id)
    res.status(201).json(addFav)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleGetFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    if (!userId) throw new Error('ID del usuario no proporcionado o inválido')
    const favorites = await getFavorites(userId)
    res.status(200).json(favorites)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleDeleteFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    if (!userId) throw new Error('ID del usuario no proporcionado o inválido')
    const deleteFav = await deleteFavorites(userId, +id)
    res.status(200).json(deleteFav)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}
