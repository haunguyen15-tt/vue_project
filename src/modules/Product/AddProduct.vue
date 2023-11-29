<script lang="ts" setup>
import { ref } from 'vue'
import FormAddProduct from './ProductForm.vue'
import ButtonComponent from '@/components/ButtonItem.vue'
import { TypeForm } from '@/types/product'

const open = ref<boolean>(false)

const showModal = () => {
  open.value = true
}

const closeModal = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}
</script>

<template>
  <div class="text-end mb-5">
    <ButtonComponent @click="showModal"> Create Product </ButtonComponent>

    <a-modal v-model:open="open" title="Basic Modal" @ok="closeModal">
      <FormAddProduct :type="TypeForm.CREATE" />
    </a-modal>
  </div>
</template>
