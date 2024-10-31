import { Request, Response } from 'express'
import { createOrder } from '../services/orderServices'

export const handleCreateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    if (!userId) throw new Error('ID del usuario no proporcionado o inválido')
    const order = await createOrder(userId, req.body)
    res.status(201).json(order)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}
