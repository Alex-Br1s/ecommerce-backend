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
  host: process.env.DATABASE_HOST ?? 'localhost',
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
    await connection.authenticate()
    //* console.log('🔥 Conectado a PostgreSQL correctamente')

    await connection.sync()
    //* console.log('📦 Modelos sincronizados con la base de datos')
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error)
  }
}

export default connectionDB
