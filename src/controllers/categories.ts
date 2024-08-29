import { Request, Response } from 'express'
import { addCategory, deleteCategory, getAllCategories, updateCategory } from '../services/categoriesServices'
import { toNewCategoryEntry, toUpdateCategoryEntry } from '../utils/req-body-category'

export const handleGetAllCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const resultAllCategories = await getAllCategories()
    res.status(200).send(resultAllCategories)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const handleAddCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const dataValidated = toNewCategoryEntry(req.body)
    const resultNewCategory = await addCategory(dataValidated)
    res.status(200).json(resultNewCategory)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const handleUpdateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const dataValidated = toUpdateCategoryEntry(req.body)
    const resultUpdateCategory = await updateCategory(+id, dataValidated)
    res.status(201).json(resultUpdateCategory)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const handleDeleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body.newCategoryId)
    const resultDeleteCategory = await deleteCategory(+req.params.id, +req.body.newCategoryId)
    res.status(202).send((resultDeleteCategory !== 0) ? 'Categoria eliminada' : 'Ocurrio un error al intentar eliminar la categoria')
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
