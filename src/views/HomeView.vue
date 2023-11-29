<script setup lang="ts">
import { watchEffect } from 'vue'

import TheTable from '@/components/TheTable.vue'
import { USER_COLUMNS } from '@/constants/user'
import { useUserStore } from '@/stores/user'

const store = useUserStore()

const handleDeleteUser = (id: number) => {
  // TODO: Delete user here
  console.log(id)
}

watchEffect(async () => {
  store.getAll()
})
</script>

<template>
  <TheTable
    v-if="store.data"
    :columns="USER_COLUMNS"
    :data="store.data"
    :on-delete="handleDeleteUser"
  />
  <a-spin v-if="store.isLoading" />
</template>
