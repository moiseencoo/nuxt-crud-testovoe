
<script setup lang="ts">
import type { User } from '~/types/userTypes'
import UserForm from '~/components/userForm.vue'

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


// API function to create user
const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch('http://localhost:2311/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error('Ошибка при создании пользователя')
  }

  return response.json()
}

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true
  error.value = null

  try {
    await createUser(formData.value)
    
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
    }, 3000)
    
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
            <v-breadcrumbs
              :items="[{ title: 'Главная', to: '/' }, { title: 'Добавить пациента' }]"
            ></v-breadcrumbs>
            <h1 class="text-4xl font-bold text-gray-900 mb-2 ml-4">
              Добавить пациента
            </h1>
            <p class="text-gray-600 ml-4">Заполните форму для создания новой карточки пациента</p>
          </div>

          <!-- Form Card -->
          <UserForm 
            :formData="formData" 
            @submit="handleSubmit" 
            :isSubmitting="isSubmitting" 
            submitButtonText="Создать пациента"
          />

          <!-- Success Alert -->
          <v-alert
            v-if="showSuccess"
            type="success"
            variant="tonal"
            class="mt-6"
            closable
            @click:close="showSuccess = false"
          >
            <template #title>Успешно!</template>
            Пациент успешно добавлен в систему.
          </v-alert>

          <!-- Error Alert -->
          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            class="mt-6"
            closable
            @click:close="error = null"
          >
            <template #title>Ошибка!</template>
            {{ error }}
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
