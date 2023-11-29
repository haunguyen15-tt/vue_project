<script lang="ts" setup>
import { ref, watchEffect, defineProps, type PropType } from 'vue'
import { TFormData, TypeForm } from '@/types/product'
import { categorys, brands } from '@/mocks/product'
import { PlusOutlined } from '@ant-design/icons-vue'
import ButtonComponent from '@/components/ButtonItem.vue'
import { useProductStore } from '@/stores/product'

const labelCol = { style: { width: '150px' } }
const wrapperCol = { span: 14 }

const { formData, type } = defineProps({
  formData: Object as PropType<TFormData>,
  type: String as PropType<TypeForm>
})

const { addProduct, loading, updateProduct } = useProductStore()

const form = ref<TFormData>({
  title: '',
  brand: '',
  category: '',
  description: '',
  price: 0,
  stock: 0,
  thumbnail: ''
})

const handleSubmit = async () => {
  const values = form.value

  if (
    [
      values.brand,
      values.category,
      values.description,
      values.price,
      values.stock,
      values.title
    ].includes('')
  ) {
    return
  }

  if (type === TypeForm.CREATE) {
    addProduct(values)
  } else {
    updateProduct(values, formData?.id as number)
  }

  form.value = {
    title: '',
    brand: '',
    category: '',
    description: '',
    price: 0,
    stock: 0,
    thumbnail: ''
  }
}

watchEffect(() => {
  if (formData) {
    form.value.title = formData.title
    form.value.brand = formData.brand
    form.value.category = formData.category
    form.value.description = formData.description
    form.value.price = formData.price
    form.value.stock = formData.stock
    form.value.thumbnail = formData.thumbnail
  }
})
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px"
    :form="form"
    @submit="handleSubmit"
    lazy-validation
  >
    <a-form-item label="Title">
      <a-input v-model:value="form.title" />
    </a-form-item>

    <a-form-item label="Brand">
      <a-select v-model:value="form.brand">
        <a-select-option v-for="brand in brands" :key="brand" :value="brand">{{
          brand
        }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="Category">
      <a-select v-model:value="form.category">
        <a-select-option v-for="category in categorys" :key="category" :value="category">{{
          category
        }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="Description">
      <a-textarea :rows="4" v-model:value="form.description" />
    </a-form-item>

    <a-form-item label="Price">
      <a-input v-model:value="form.price" type="number" />
    </a-form-item>
    <a-form-item label="Stock">
      <a-input v-model:value="form.stock" type="number" />
    </a-form-item>

    <a-form-item label="Upload">
      <a-upload action="" list-type="picture-card">
        <div v-if="form.thumbnail">
          <img
            :src="form.thumbnail"
            alt="Product Image"
            class="image-upload w-full h-full object-cover rounded-lg"
          />
        </div>
        <div v-else>
          <PlusOutlined />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>
    </a-form-item>
    <div class="text-center">
      <ButtonComponent v-if="loading" class="" click="handleSubmit">....loading</ButtonComponent>
      <ButtonComponent class="" click="handleSubmit">{{ type }} product</ButtonComponent>
    </div>
  </a-form>
</template>
