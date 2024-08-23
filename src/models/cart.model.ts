import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript'
import { User } from './user.model'

@Table({
  tableName: 'Cart',
  timestamps: true
})

export class Cart extends Model<Cart> {
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
}
