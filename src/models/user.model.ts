import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript'
import { Favorite } from './favorite.model'

@Table({
  tableName: 'User',
  timestamps: true
})

export class User extends Model<User> {
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
    firstName!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    lastName!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    profilePicture!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
    email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    password!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'customer'
  })
    role!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
    isActive!: boolean

  @HasMany(() => Favorite)
    favorites!: Favorite[]
}
