import { Request, Response } from 'express'
import { addCategory, getAllCategories, updateCategory } from '../services/categoriesServices'
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
    const categoryFiltered = toNewCategoryEntry(req.body)
    const resultNewCategory = await addCategory(categoryFiltered)
    res.status(200).json(resultNewCategory)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const handleUpdateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const categoryFiltered = toUpdateCategoryEntry(req.body)
    const resultUpdateCategory = await updateCategory(+id, categoryFiltered)
    res.status(201).json(resultUpdateCategory)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
