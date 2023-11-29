import type { User } from '@/interfaces/user'
import request from '@/request'
import { checkError } from '@/utils/checkError'
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
      err.value = checkError(error)
      isLoading.value = false
    } finally {
      isLoading.value = false
    }
  }

  const addUser = async (user: User) => {
    try {
      isLoading.value = true
      const res = await request({
        url: '/users/add',
        method: 'POST',
        data: user
      })

      data.value?.push(res.data)
    } catch (error) {
      err.value = checkError(error)
      isLoading.value = false
    } finally {
      isLoading.value = false
    }
  }

  const updateUser = async (id: number, body: Omit<User, 'id'>) => {
    try {
      isLoading.value = true
      await request({
        url: `/users/${id}`,
        method: 'PUT',
        data: body
      })

      data.value =
        data.value &&
        data.value.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...body
            }
          }
          return item
        })
    } catch (error) {
      err.value = checkError(error)
      isLoading.value = false
    } finally {
      isLoading.value = false
    }
  }

  const deleteUser = async (id: number) => {
    try {
      isLoading.value = true
      await request({
        url: `/users/${id}`,
        method: 'DELETE'
      })

      data.value = data.value && data.value.filter((item) => item.id !== id)
    } catch (error) {
      err.value = checkError(error)
      isLoading.value = false
    } finally {
      isLoading.value = false
    }
  }

  return {
    getAll,
    addUser,
    updateUser,
    deleteUser,
    data,
    isLoading,
    err
  }
})
