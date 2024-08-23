import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, BelongsToMany } from 'sequelize-typescript'
import { Product } from './product.model'
import { ProductCategory } from './productCategory.model'

@Table({
  tableName: 'Category',
  timestamps: true
})

export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
    id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    categoryName!: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
    description?: string

  @BelongsToMany(() => Product, () => ProductCategory)
    products!: Product[]
}
