import { Order } from '../models/order.model'
import { CreationAttributes } from 'sequelize'
import { Product } from '../models/product.model'
import { OrderItem } from '../models/orderItem.model'
import { OrderEntry } from '../types/types'

export const createOrder = async (userId: number, dataOrder: { items: OrderEntry [] }): Promise<any> => {
  const { items } = dataOrder
  if (!items.length || items.length === 0) throw new Error('La orden debe contener almenos un producto')
  try {
    let totalAmount: number = 0
    const order = {
      userId,
      status: 'pending',
      totalAmount: 0
    }
    // ? Creamos una orden
    const newOrder = await Order.create(order as CreationAttributes<Order>)
    // ? Recorremos los items que serian los productos que se quiere comprar
    //* "items": [{"productId": 3,"quantity": }, {"productId": 2, "quantity": 1}]
    for (const item of items) {
      const product = await Product.findByPk(item.productId)
      if (!product) throw new Error(`El producto con id: ${item.productId} no existe`)

      // ? Calculamos el precio total de los productos en la orden X la cantidad
      const itemTotal = product.price * item.quantity
      totalAmount += itemTotal

      // ? Creamos una orden de productos en el modelo OrderItem
      const orderItems = {
        orderId: newOrder.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      }
      const orden = await OrderItem.create(orderItems as CreationAttributes<OrderItem>)
      console.log(orden)
    }
    // ? Actualizamos el monto total de la orden
    newOrder.totalAmount = totalAmount
    await newOrder.save()
    return newOrder
  } catch (error) {
    throw new Error(`Error al crear la orden: ${(error as Error).message}`)
  }
}
