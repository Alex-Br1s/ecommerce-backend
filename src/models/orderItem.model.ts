import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript'
import { Order } from './order.model'
import { Product } from './product.model'

@Table({
  tableName: 'OrderItem',
  timestamps: true
})

export class OrderItem extends Model<OrderItem> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
    id!: number

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    orderId!: number

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
    allowNull: false
  })
    price!: number
}
