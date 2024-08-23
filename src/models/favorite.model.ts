import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './user.model'
import { Product } from './product.model'

@Table({
  tableName: 'Favorite',
  timestamps: true
})

export class Favorite extends Model<Favorite> {
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

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    productId!: number

  @BelongsTo(() => User)
    user!: User

  @BelongsTo(() => Product)
    product!: Product
}
