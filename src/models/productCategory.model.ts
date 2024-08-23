import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript'
import { Product } from './product.model'
import { Category } from './category.model'

@Table({
  tableName: 'ProductCategory',
  timestamps: true
})

export class ProductCategory extends Model<ProductCategory> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
    id!: number

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    productId!: number

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    categoryId!: number
}
