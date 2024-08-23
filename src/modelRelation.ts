import { User } from './models/user.model'
import { Product } from './models/product.model'
import { Category } from './models/category.model'
import { Cart } from './models/cart.model'
import { CartItem } from './models/cartItem.model'
import { Order } from './models/order.model'
import { OrderItem } from './models/orderItem.model'
import { Favorite } from './models/favorite.model'
import { ProductCategory } from './models/productCategory.model'

export function initializeAssociations (): void {
  // Relación entre User y Order
  User.hasMany(Order, { foreignKey: 'userId' })
  Order.belongsTo(User, { foreignKey: 'userId' })

  // Relación entre User y Favorite
  User.hasMany(Favorite, { foreignKey: 'userId' })
  Favorite.belongsTo(User, { foreignKey: 'userId' })

  // Relación entre User y Cart
  User.hasOne(Cart, { foreignKey: 'userId' })
  Cart.belongsTo(User, { foreignKey: 'userId' })

  // Relación entre Cart y CartItem
  Cart.hasMany(CartItem, { foreignKey: 'cartId' })
  CartItem.belongsTo(Cart, { foreignKey: 'cartId' })

  // Relación entre Product y CartItem
  Product.hasMany(CartItem, { foreignKey: 'productId' })
  CartItem.belongsTo(Product, { foreignKey: 'productId' })

  // Relación entre Category y Product
  Category.belongsToMany(Product, { through: ProductCategory, foreignKey: 'categoryId' })
  Product.belongsToMany(Category, { through: ProductCategory, foreignKey: 'productId' })

  // Relación entre Order y OrderItem
  Order.hasMany(OrderItem, { foreignKey: 'orderId' })
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' })

  // Relación entre Product y OrderItem
  Product.hasMany(OrderItem, { foreignKey: 'productId' })
  OrderItem.belongsTo(Product, { foreignKey: 'productId' })

  // Relación entre Product y Cart
  Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'productId' })

  // Relación entre Product y Favorite
  Product.belongsToMany(User, { through: Favorite, foreignKey: 'productId' })
  Favorite.belongsTo(Product, { foreignKey: 'productId' })
}
