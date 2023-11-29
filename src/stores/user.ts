import type { User } from '@/interfaces/user'
import request from '@/request'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('users', () => {
  const isLoading = ref(false)
  const data = ref<User[] | null>(null)
  const err = ref('')

  const getAll = async () => {
    isLoading.value = true

    try {
      const res = await request({
        url: '/users',
        method: 'GET'
      })
      data.value = res.data.users
    } catch (error: unknown) {
      console.log('Error', error)
      if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
        err.value = error.message
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    getAll,
    data,
    isLoading,
    err
  }
})
