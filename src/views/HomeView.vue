<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import TheTable from '@/components/TheTable.vue'
import { USER_COLUMNS } from '@/constants/user'
import { useUserStore } from '@/stores/user'
import UserForm from '@/components/user/UserForm.vue'
import type { User } from '@/interfaces/user'

const store = useUserStore()
const isOpen = ref(false)
const currentUser = ref<User | undefined>(undefined)

const handleDeleteUser = async (id: number) => {
  await store.deleteUser(id)
}

const handleOpenForm = (user: User) => {
  currentUser.value = user
  isOpen.value = true
}

const handleCancelForm = () => {
  isOpen.value = false
  currentUser.value = undefined
}

watchEffect(async () => {
  store.getAll()
})
</script>

<template>
  <button
    @click="
      () => {
        isOpen = true
      }
    "
  >
    Add User
  </button>
  <a-spin v-if="store.isLoading" />
  <TheTable
    v-if="store.data"
    :columns="USER_COLUMNS"
    :data="store.data"
    :on-delete="handleDeleteUser"
    :on-edit="handleOpenForm"
  />
  <UserForm :is-open="isOpen" :on-cancel="handleCancelForm" :user="currentUser" />
</template>
