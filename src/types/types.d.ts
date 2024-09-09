// ? Types de products
export interface ProductEntry {
  id: number
  name: string
  price: number
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

export type NewUserEntry = Omit<UserEntry, 'id' | 'role' | 'isActive'>

export type updateUserEntry = Omit<UserEntry, 'id' | 'email' | 'password' | 'role' | 'isActive' >

export interface LoginEntry {
  email: string
  password: string
}

export type ChangePasswordEntry = LoginEntry & { newPassword: string }
