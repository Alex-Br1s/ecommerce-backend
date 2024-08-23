import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './user.model'

@Table({
  tableName: 'Order',
  timestamps: true
})

export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
    id!: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    userId!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
    totalAmount!: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    status!: string

  @BelongsTo(() => User)
    user!: User
}
