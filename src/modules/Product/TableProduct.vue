<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { columns } from '@/mocks/product'
import { useProductStore } from '@/stores/product'
import ButtonComponent from '@/components/ButtonItem.vue'
import UpdateProduct from '@/modules/Product/UpdateProduct.vue'
import type { IColumn, IProductItem } from '@/types/product'

const productStore = useProductStore()

const producrData = computed(() => {
  return productStore.products
})

onMounted(() => {
  productStore.getAllProduct()
})
</script>

<template>
  <a-table :columns="columns" :data-source="producrData">
    <template class="headerCell" />

    <template #bodyCell="{ column, record }: { column: IColumn; record: IProductItem }">
      <template v-if="column.key === 'description'">
        <div class="max-w-[300px]">
          <p>{{ record.description }}</p>
        </div>
      </template>

      <template v-if="column.key === 'thumbnail'">
        <div class="w-20 h-20">
          <img :src="record.thumbnail" class="w-full h-full object-cover rounded-md" />
        </div>
      </template>

      <template v-else-if="column.key === 'action'">
        <div class="flex gap-4">
          <UpdateProduct :productDetail="record">Update</UpdateProduct>
          <ButtonComponent @click="() => productStore.deleteProduct(record.id as number)"
            >Delete</ButtonComponent
          >
        </div>
      </template>
    </template>
  </a-table>
</template>
