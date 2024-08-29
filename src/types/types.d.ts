// ? Types de products
export interface ProductEntry {
  id: number
  name: string
  price: number
  stock: number
  description?: string
  image: string
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
  email: string
  password: string
  role: string
}

export type NewUserEntry = Omit<UserEntry, 'id'>

export interface LoginEntry {
  email: string
  password: string
}
