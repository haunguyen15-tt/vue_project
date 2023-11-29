<script lang="ts" setup>
import { ref, type PropType } from 'vue'
import { IProductItem, TypeForm } from '@/types/product'
import FormAddProduct from './ProductForm.vue'
import ButtonComponent from '@/components/ButtonItem.vue'

const { productDetail } = defineProps({
  productDetail: Object as PropType<IProductItem>
})

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
  <ButtonComponent @click="showModal"> <slot>Update</slot> </ButtonComponent>

  <a-modal v-model:open="open" title="Basic Modal" @ok="closeModal">
    <FormAddProduct :formData="productDetail" :type="TypeForm.UPDATE" />
  </a-modal>
</template>
