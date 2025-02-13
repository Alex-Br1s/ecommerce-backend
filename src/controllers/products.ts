
import { Request, Response } from 'express'
import { getAllProducts, getOneProduct, createProduct, deleteOneProduct, updateProduct, getAllProductsFilters, getAllProductsStock } from '../services/productsServices'
import { toNewProductEntry, toUpdateProductEntry } from '../utils/req-body-product'

export const handleGetAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })//* Maneja errores de manera adecuada
  }
}

export const handleGetAllProductsStock = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProductsStock()
    res.status(200).json({ products })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const handleGetAllProductsFilters = async (req: Request, res: Response): Promise<void> => {
  try {
    const productsCategories = await getAllProductsFilters(req.query)
    res.status(200).json(productsCategories)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const handleGetOneProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const oneProduct = await getOneProduct(+req.params.id)
    res.status(200).send(oneProduct)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const handleCreateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const dataValidated = toNewProductEntry(req.body)
    const resultNewProduct = await createProduct(dataValidated)
    res.status(201).json(resultNewProduct)
  } catch (error) {
    //* Aserción de tipo para tratar a error como un objeto Error
    const errorMessage = error as Error
    res.status(500).send(errorMessage.message)
  }
}

export const handleUpdateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const dataValidated = toUpdateProductEntry(req.body)
    const updatedProduct = await updateProduct(+id, dataValidated)
    res.status(201).json(updatedProduct)
  } catch (error) {
    const errorMessage = error as Error
    res.status(500).send(errorMessage.message)
  }
}

export const handleDeleteOneProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultDeleteProduct = await deleteOneProduct(+req.params.id)
    resultDeleteProduct
      ? res.status(202).send('Producto eliminado')
      : res.status(403).send('Ocurrio un error al intentar eliminar el producto')
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
