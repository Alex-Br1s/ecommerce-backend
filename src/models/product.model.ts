import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany, BelongsToMany } from 'sequelize-typescript'
import { Favorite } from './favorite.model'
import { Category } from './category.model'
import { ProductCategory } from './productCategory.model'

@Table({
  tableName: 'Product',
  timestamps: true
})

export class Product extends Model<Product> {
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
    name!: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
    price!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    stock!: number

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
    description?: string

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false
  })
    images!: string[]

  @BelongsToMany(() => Category, () => ProductCategory)
    categories!: Category[]

  @HasMany(() => Favorite)
    favorites!: Favorite[]
}
