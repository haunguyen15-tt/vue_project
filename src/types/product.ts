export interface IColumn {
  title: string
  dataIndex?: string
  key: string
}

export enum ICateGory {
  FRAGRANCES = 'fragrances',
  SKINCARE = 'skincare',
  GROCERIES = 'groceries',
  HOME_DEECORATION = 'home-decoration',
  SMARTPHONES = 'smartphones',
  LAPTOPS = 'laptops'
}

export enum IBrand {}

export interface IProductItem {
  id?: number
  brand: string
  category: string
  description: string
  price: number
  stock: number
  thumbnail: string
  title: string
}

export interface IProduct {
  limit: number
  skip: number
  total: number
  products: IProductItem[]
}

export type TFormData = Omit<IProductItem, 'images'>

export enum TypeForm {
  CREATE = 'cerate',
  UPDATE = 'update'
}
