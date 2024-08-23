import { Request, Response } from 'express'
import { addCategory, getAllCategories } from '../services/categoriesServices'
import toNewCategoryEntry from '../utils/req-body-category'

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
    const newCategory = toNewCategoryEntry(req.body)
    const resultNewCategory = await addCategory(newCategory)
    res.status(201).json(resultNewCategory)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
