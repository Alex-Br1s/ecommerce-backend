import { Cart } from '../models/cart.model'
import { Product } from '../models/product.model'
import { CartItem } from '../models/cartItem.model'
import { CreationAttributes } from 'sequelize'
import { ResponseAddCart } from '../types/types'

export const getCart = async (userId: number): Promise<any> => {
  try {
    // ? Buscar el carrito del usuario logeado
    const cart = await Cart.findOne({ where: { userId } })
    if (!cart) throw new Error('Carrito no encontrado o carrito vacio')

    //* Obtener los items del carrito e incluir los detalles del producto
    const cartItems = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [{ model: Product }] // * Incluyo el modelo Product para acceder a los datos de los productos en el carrito como nombre, imagenes, etc
    })
    return {
      cartId: cart.id,
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        productName: item.product.name,
        productImage: item.product.images
      }))
    }
  } catch (error) {
    throw new Error(`Error al obtener el carrito del usuario: ${(error as Error).message}`)
  }
}

export const addCart = async (productId: number, quantity: number, userId: number): Promise<ResponseAddCart> => {
  try {
    const product = await Product.findByPk(productId)
    if (!product) throw new Error('Producto no encontrado')

    //* Buscar el carrito del usuario
    let cartUser = await Cart.findOne({ where: { userId } })
    console.log(cartUser)
    //* Si no existe carrito crearlo
    if (!cartUser) {
      const idUser = { userId }
      cartUser = await Cart.create(idUser as CreationAttributes<Cart>)
      console.log(cartUser)
    }

    //* Verificar si el producto ya está en el carrito
    const productInCart = await CartItem.findOne({ where: { cartId: cartUser.id, productId } })

    if (productInCart) {
      //* Si el producto ya está en el carrito, actualizar la cantidad
      productInCart.quantity += quantity
      productInCart.price += product.price * quantity
      await productInCart.save()
    } else {
      //* Si el producto no está en el carrito, agregarlo
      const newCart = {
        cartId: cartUser.id,
        productId,
        quantity,
        price: product.price * quantity
      }
      await CartItem.create(newCart as CreationAttributes<CartItem>)
    }
    // Devolver el carrito actualizado
    const updatedCartItems = await CartItem.findAll({ where: { cartId: cartUser.id } })
    console.log(updatedCartItems)
    return {
      cartId: cartUser.id,
      items: updatedCartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    }
  } catch (error) {
    throw new Error(`Error al agregar un producto al carrito: ${(error as Error).message}`)
  }
}

export const deleteProduct = async (productId: number, userId: number): Promise<number> => {
  try {
    const cart = await Cart.findOne({ where: { userId } })
    if (!cart) throw new Error('El usuario no tiene un carrito')
    const productDeleted = await CartItem.destroy({ where: { productId, cartId: cart.id } })
    if (productDeleted === 0) throw new Error('El producto no se elimino del carrito')
    return productDeleted
  } catch (error) {
    throw new Error(`Error al eliminar un producto del carrito: ${(error as Error).message}`)
  }
}

export const clearCart = async (userId: number): Promise<number> => {
  try {
    const cart = await Cart.findOne({ where: { userId } })
    if (!cart) throw new Error('No se encontro el carrito')
    const cleanCart = await CartItem.destroy({ where: { cartId: cart.id } })
    if (cleanCart === 0) throw new Error('El carrito no se vacio')
    return cleanCart
  } catch (error) {
    throw new Error(`Error al querer vaciar el carrito: ${(error as Error).message}`)
  }
}
