<script setup lang="ts">
import UserForm from '~/components/userForm.vue'
import { useUsersStore } from '~/stores/users'
import { createUser } from '~/composables/useUsersApi'
import { NuxtLink } from '#components'

const userStore = useUsersStore()

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  company: {
    name: ''
  }
})

// Form state
const isSubmitting = ref(false)
const showSuccess = ref(false)
const error = ref<string | null>(null)

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true
  error.value = null

  try {
    const createdUser = await createUser(formData.value)
    console.log(createdUser)
    
    // Only proceed if we got back a valid user with an ID
    if (createdUser && createdUser.id) {
      await userStore.refetch()
      // Reset form
      formData.value = {
        name: '',
        email: '',
        phone: '',
        company: { name: '' }
      }
  
      // Show success message
      showSuccess.value = true
  
      // Hide success message after 3 seconds
      setTimeout(() => {
        showSuccess.value = false
      }, 5000)
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Произошла неизвестная ошибка'
  } finally {
    isSubmitting.value = false
  }
}

// Reset form on page load
onMounted(() => {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    company: { name: '' }
  }
})
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <v-container class="py-8">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <!-- Header -->
          <div class="mb-8">
            <v-breadcrumbs :items="[{ title: 'Главная', to: '/' }, { title: 'Добавить пациента' }]"></v-breadcrumbs>
            <h1 class="text-4xl font-bold text-gray-900 mb-2 ml-4">
              Добавить пациента
            </h1>
            <p class="text-gray-600 ml-4">Заполните форму для создания новой карточки пациента</p>
          </div>

          <!-- Form Card -->
          <UserForm :formData="formData" @submit="handleSubmit" :isSubmitting="isSubmitting" />

          <!-- Success Alert -->
          <v-alert v-if="showSuccess" type="success" variant="tonal" class="mt-6" closable
            @click:close="showSuccess = false">
            <template #title>Успешно!</template>
            Пациент успешно добавлен в систему. <br />
            <NuxtLink to="/" class="text-primary text-decoration-underline hover:text-primary-darken-1">Вернуться на главную</NuxtLink>
          </v-alert>

          <!-- Error Alert -->
          <v-alert v-if="error" type="error" variant="tonal" class="mt-6" closable @click:close="error = null">
            <template #title>Ошибка!</template>
            {{ error }}
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
