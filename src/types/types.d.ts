export interface ProductEntry {
  id: number
  name: string
  price: number
  stock: number
  description?: string
  image: string
}
export type NewProductEntry = Omit<ProductEntry, 'id'> & { categoryId: number[] }

// export type NewProductEntryCategory = Pick<ProductEntry, 'id', 'name', 'price', 'stock', 'description', 'image', 'categoryId'>

export interface NewProductCategoryEntry {
  productId: number
  categoryId: number[]
}

export interface CategoryEntry {
  id: number
  categoryName: string
  description?: string
}

export type NewCategoryEntry = Omit<CategoryEntry, 'id'>
