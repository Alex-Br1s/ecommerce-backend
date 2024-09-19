import { Request, Response } from 'express'
import { addCart, clearCart, deleteProduct, getCart } from '../services/cartServices'

export const handleGetCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    if (!userId) throw new Error('ID del usuario no proporcionado o inválido')
    const userCart = await getCart(userId)
    res.status(200).json(userCart)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleAddCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    if (!userId) throw new Error('ID del usuario no proporcionado o inválido')

    const { productId, quantity } = req.body
    if (!productId || !quantity) res.status(400).json({ message: 'ProductId y quantity son requeridos' })

    const cartWithProducts = await addCart(productId, quantity, userId)
    res.status(201).json({
      message: 'Producto agregado al carrito',
      cart: cartWithProducts
    })
  } catch (error) {
    res.status(500).send((error as Error).message
    )
  }
}

export const handleDeleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    if (!userId) throw new Error('El usuario debe estar logeado, no se encontro el id')
    const productRemoved = await deleteProduct(+id, userId)
    productRemoved ? res.status(202).send('Product removed') : res.status(404).send('Ocurrio un error')
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleClearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    if (!userId) throw new Error('El usuario debe estar logeado, no se encontro el id')
    const emptyCart = await clearCart(userId)
    emptyCart ? res.status(202).send('Carrito vacio') : res.status(404).send('Ocurrio un error al querer vaciar el carrito')
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}
