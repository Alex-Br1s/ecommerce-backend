import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { User } from '../models/user.model'
import { Product } from '../models/product.model'
import { Favorite } from '../models/favorite.model'
import { Category } from '../models/category.model'
import { Cart } from '../models/cart.model'
import { CartItem } from '../models/cartItem.model'
import { Order } from '../models/order.model'
import { OrderItem } from '../models/orderItem.model'
import { ProductCategory } from '../models/productCategory.model'
import { initializeAssociations } from '../modelRelation'

dotenv.config()
export const connection = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
  models: [
    User,
    Product,
    Favorite,
    Category,
    Cart,
    CartItem,
    Order,
    OrderItem,
    ProductCategory
  ]
})

initializeAssociations()

async function connectionDB (): Promise<void> {
  try {
    await connection.sync()
  } catch (error) {
    console.log(error)
  }
}

export default connectionDB
