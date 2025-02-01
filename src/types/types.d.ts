import { User } from '../models/user.model'

// ? Types de products
export interface ProductEntry {
  id: number
  name: string
  price: number
  offer: boolean
  salePrice?: number | null
  stock: number
  description?: string
  images: string[]
}
export type NewProductEntry = Omit<ProductEntry, 'id'> & { categoryId: number[] }

// ? Types de categories
export interface CategoryEntry {
  id: number
  categoryName: string
  description?: string
}
export type NewCategoryEntry = Omit<CategoryEntry, 'id'>

// ? Types de users

export interface UserEntry {
  id: number
  firstName: string
  lastName: string
  profilePicture: string
  email: string
  password: string
  role: string
  isActive: boolean
}
export interface LoginEntry {
  email: string
  password: string
  favorites?: number[]
}

/* export interface AuthenticatedUser {
  id: number
  gmail: string
  role: string
} */

export type NewUserEntry = Omit<UserEntry, 'id' | 'isActive'>

export type updateUserEntry = Omit<UserEntry, 'id' | 'email' | 'password' | 'role' | 'isActive' >

export type ChangePasswordEntry = LoginEntry & { newPassword: string }

export interface ResponseAddCart {
  cartId: number
  items: Array<{
    productId: number
    quantity: number
    price: number
  }>
}

export interface OrderEntry {

  productId: number
  quantity: number

}

declare global {
  namespace Express {
    interface Request {
      user?: User // 👈 Agregamos la propiedad 'user' al request
    }
  }
}

// src/types/express.d.ts
declare namespace Express {
  export interface Request {
    user?: {
      id: number
      email: string
      role: string
    }
  }
}
