
import { Request, Response } from 'express'
import { getAllProducts, getOneProduct, addNewProduct, deleteOneProduct, updateProduct, getAllProductsFilters } from '../services/productsServices'
import { toNewProductEntry, toUpdateProductEntry } from '../utils/req-body-product'

export const handleGetAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts(req.query)
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })//* Maneja errores de manera adecuada
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

export const handleAddProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = toNewProductEntry(req.body)
    const resultNewproduct = await addNewProduct(newProduct)
    res.status(201).json(resultNewproduct)
  } catch (error) {
    //* Aserción de tipo para tratar a error como un objeto Error
    const errorMessage = error as Error
    res.status(500).send(errorMessage.message)
  }
}

export const handleUpdateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const updatedProduct = toUpdateProductEntry(req.body)
    const resultUpdatedProduct = await updateProduct(+id, updatedProduct)
    res.status(201).json(resultUpdatedProduct)
  } catch (error) {
    const errorMessage = error as Error
    res.status(500).send(errorMessage.message)
  }
}

export const handleDeleteOneProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultDeleteProduct = await deleteOneProduct(+req.params.id)
    res.status(202).send((resultDeleteProduct !== 0) ? 'Producto eliminado' : 'Ocurrio algo inesperado')
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
