<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import type { User } from '@/interfaces/user'
import { ref, type PropType, watchEffect } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  isOpen: Boolean,
  onCancel: Function,
  user: Object as PropType<User>
})

const store = useUserStore()
const confirmLoading = ref<boolean>(false)

const formState = ref({
  firstName: '',
  lastName: '',
  birthDate: dayjs(Date.now()),
  age: 0,
  email: '',
  bloodGroup: ''
})

watchEffect(() => {
  if (props.user) {
    formState.value.firstName = props.user.firstName
    formState.value.lastName = props.user.lastName
    formState.value.birthDate = dayjs(props.user.birthDate)
    formState.value.email = props.user.email
    formState.value.bloodGroup = props.user.bloodGroup
  }
})

const onFinish = async (values: any) => {
  try {
    if (props.user) {
      await store.updateUser(props.user.id, {
        ...formState.value,
        birthDate: formState.value.birthDate.toString()
      })
    } else {
      await store.addUser(values)
    }
    formState.value = {
      firstName: '',
      lastName: '',
      birthDate: dayjs(Date.now()),
      age: 0,
      email: '',
      bloodGroup: ''
    }
    props.onCancel && props.onCancel()
  } catch (error) {
    console.log(error)
  }
}

const handleClose = () => {
  props.onCancel && props.onCancel()
  formState.value = {
    firstName: '',
    lastName: '',
    birthDate: dayjs(Date.now()),
    age: 0,
    email: '',
    bloodGroup: ''
  }
}
</script>

<template>
  <a-modal :open="isOpen" title="User form" :confirm-loading="confirmLoading" @cancel="handleClose">
    <template #footer></template>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="on"
      @finish="onFinish"
    >
      <a-form-item label="First Name" name="firstName">
        <a-input v-model:value="formState.firstName" />
      </a-form-item>
      <a-form-item label="Last Name" name="lastName">
        <a-input v-model:value="formState.lastName" />
      </a-form-item>
      <a-form-item label="Birth Date" name="birthDate">
        <a-date-picker v-model:value="formState.birthDate" />
      </a-form-item>
      <a-form-item label="Age" name="age">
        <a-input-number v-model:value="formState.age" />
      </a-form-item>
      <a-form-item label="Email" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item label="Blood group" name="bloodGroup">
        <a-input v-model:value="formState.bloodGroup" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
