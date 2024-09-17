import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Cart } from './cart.model'
import { Product } from './product.model'

@Table({
  tableName: 'CartItem',
  timestamps: true
})

export class CartItem extends Model<CartItem> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
    id!: number

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    cartId!: number

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    productId!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    quantity!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  })
    price!: number

  // Relación explícita con el modelo Product
  @BelongsTo(() => Product)
    product!: Product // <-- Declara explícitamente la propiedad product aquí
}
