import type { IColumn } from '@/types/product'

export const columns: IColumn[] = [
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'branch'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Price',
    key: 'price',
    dataIndex: 'price'
  },
  {
    title: 'Stock',
    key: 'stock',
    dataIndex: 'stock'
  },
  {
    title: 'Thumbnail',
    key: 'thumbnail',
    dataIndex: 'thumbnail'
  },
  {
    title: 'Action',
    key: 'action'
  }
]

export const categorys = {
  FRAGRANCES: 'fragrances',
  SKINCARE: 'skincare',
  GROCERIES: 'groceries',
  HOME_DEECORATION: 'home-decoration',
  SMARTPHONES: 'smartphones',
  LAPTOPS: 'laptops'
} as const

export const brands = {
  APPLE: 'Apple',
  SAMSUNG: 'Samsung',
  OPPO: 'OPPO',
  HUAWEI: 'Huawei',
  MICROSOFT_SURFACE: 'Microsoft Surface',
  INFINIX: 'Infinix',
  HP_PAVILION: 'HP Pavilion'
} as const
