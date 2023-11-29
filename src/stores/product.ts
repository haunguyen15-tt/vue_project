import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getProduct,
  deleteProductById,
  createProduct,
  updateProductById
} from '@/services/products'
import type { IProductItem, IProduct, TFormData } from '@/types/product'

export const useProductStore = defineStore('product', () => {
  const data = ref<IProduct>()
  const products = ref<IProductItem[]>([])

  const loading = ref(false)

  const getAllProduct = async () => {
    loading.value = true

    const dataProducts = await getProduct()

    if (!dataProducts) {
      loading.value = false
      return
    }

    loading.value = false
    data.value = dataProducts
    products.value = dataProducts.products
  }

  const addProduct = async (payload: TFormData) => {
    loading.value = true

    const product = await createProduct(payload)

    if (product) {
      loading.value = false

      products.value = [product, ...products.value]
    }

    loading.value = false
  }

  const updateProduct = async (payload: TFormData, id: number) => {
    loading.value = true

    const product = await updateProductById(payload, id)

    if (product) {
      loading.value = false
      products.value = [...products.value].map((product) => {
        if (product.id === id) {
          product = payload
        }
        return product
      })
    }

    loading.value = false
  }

  const deleteProduct = async (id: number) => {
    loading.value = true

    const itemRemoved = await deleteProductById(id)

    if (itemRemoved) {
      loading.value = false
      products.value = [...products.value].filter((item: IProductItem) => item.id !== id)
    }

    loading.value = false
  }

  return {
    data,
    loading,
    products,
    addProduct,
    getAllProduct,
    deleteProduct,
    updateProduct
  }
})
