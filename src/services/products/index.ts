import http from '@/api/public'
import { API_ENDPOINTS } from '@/configs/apis'
import type { IProduct, IProductItem, TFormData } from '@/types/product'

export const getProduct = async () => {
  try {
    const { data } = await http.get<IProduct>(API_ENDPOINTS.PRODUCTS)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteProductById = async (id: number) => {
  try {
    const { data } = await http.delete<IProductItem>(`${API_ENDPOINTS.PRODUCTS}/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createProduct = async (payload: TFormData) => {
  try {
    const { data } = await http.post<IProductItem>(API_ENDPOINTS.CREATE_PRODUCT, payload)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateProductById = async (payload: TFormData, id: number) => {
  try {
    const { data } = await http.put<IProductItem>(`${API_ENDPOINTS.PRODUCTS}/${id}`, payload)
    return data
  } catch (error) {
    console.log(error)
  }
}
