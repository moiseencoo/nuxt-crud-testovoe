<script setup lang="ts">
import { useUsersStore } from '~/stores/users'
import UserCard from '~/components/userCard.vue'
import UserForm from '~/components/userForm.vue'
import UserFiltration from '~/components/userFiltration.vue'
import type { TUser } from '~/types/userTypes'

const usersStore = useUsersStore()
const { users, isLoading, error, page, limit, pageCount, filteredUsers } = storeToRefs(usersStore)
const { setPage, setLimit, limitOptions } = usersStore
import { deleteUser, updateUser } from '~/composables/useUsersApi'

// Dialog state
const showEditDialog = ref(false)
const editingUser = ref<TUser | null>(null)
const isSubmitting = ref(false)
const showSuccess = ref(false)
const errorEditingUser = ref<string | null>(null)

const handleLimitChange = (limit: number) => {
  setPage(1)
  setLimit(limit)
}

const handleDelete = async (id: string) => {
  await deleteUser(id)
  await usersStore.refetch()
}

const handleEdit = (userId: number) => {
  const user = (users.value || []).find((user: TUser) => user.id === userId)
  if (user) {
    editingUser.value = { ...user } as TUser
    showEditDialog.value = true
  }
}

const handleSaveEditModal = async (updatedUser: TUser) => {
  try {
    isSubmitting.value = true
    await updateUser(updatedUser)
    await usersStore.refetch()
    showEditDialog.value = false
    editingUser.value = null
    showSuccessMessage()
  } catch (error) {
    console.error('Error updating user:', error)
  } finally {
    isSubmitting.value = false
  }
}

const showSuccessMessage = () => {
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const handleCloseEditModal = () => {
  showEditDialog.value = false
  editingUser.value = null
}

const goToCreatePage = () => {
  navigateTo('/create')
}

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <v-container class="py-8">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <!-- Header -->
          <div class="d-flex justify-space-between">
            <div class="mb-8 flex-grow-1">
              <h1 class="text-4xl font-bold text-gray-900 mb-2">
                {{ 'Карточки пациентов' }}
              </h1>
            </div>
            <v-btn @click="goToCreatePage" class="mb-4 ma-2" color="blue-darken-3" rounded="2" variant="flat">
              <v-icon icon="mdi-plus" start></v-icon>
              Добавить пациента</v-btn>
          </div>

          <!-- Loading State -->
          <v-card v-if="isLoading" class="mb-6">
            <v-card-text class="text-center py-8">
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
              <p class="mt-4 text-gray-600">Загрузка</p>
            </v-card-text>
          </v-card>

          <!-- Error State -->
          <v-alert v-if="error" type="error" variant="tonal" class="mb-6">
            {{ error.message }}
          </v-alert>

          <!-- Users List -->
          <div v-if="!isLoading && !error">
            <UserFiltration />

            <v-row>
              <v-col v-for="user in filteredUsers" :key="user.id" cols="12" md="6">
                <UserCard :user="user" @delete="handleDelete" @edit="handleEdit" />
              </v-col>
            </v-row>

            <!-- Empty State -->
            <v-card v-if="filteredUsers.length === 0" class="text-center py-12">
              <v-icon size="64" color="grey" class="mb-4">
                mdi-account-off
              </v-icon>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                {{ 'Ничего не найдено' }}
              </h3>
            </v-card>
          </div>

          <div class="d-flex justify-center align-baseline">
            <v-pagination v-model="page" :length="pageCount" @update:modelValue="setPage" class="mt-8 flex-grow-1" />
            <v-select v-model="limit" :items="limitOptions" label="Показывать по" variant="underlined" :max-width="100"
              @update:modelValue="handleLimitChange"></v-select>
          </div>

        </v-col>
      </v-row>
    </v-container>

    <!-- Edit User Dialog -->
    <v-dialog v-model="showEditDialog" max-width="600px" persistent @click:outside="handleCloseEditModal">
      <v-card>
        <v-card-title class="bg-primary text-white">
          <v-icon start>mdi-account-edit</v-icon>
          Редактировать пациента
        </v-card-title>
        <v-card-text class="pt-6">
          <UserForm 
            v-if="editingUser" 
            :formData="editingUser" 
            :isSubmitting="isSubmitting"
            @submit="handleSaveEditModal" 
            />
          </v-card-text>
      </v-card>
    </v-dialog>
     <!-- Success Alert -->
    <v-alert v-if="showSuccess" type="success" variant="flat" closable position="fixed" 
      style="top: 16px; right: 16px; z-index: 1000;"
      @click:close="showSuccess = false">
      <template #title>Успешно!</template>
      Данные изменены.
    </v-alert>

    <!-- Error Alert -->
    <v-alert v-if="errorEditingUser" type="error" variant="tonal" class="mt-6" closable @click:close="errorEditingUser = null">
      <template #title>Ошибка!</template>
      {{ errorEditingUser }}
    </v-alert>
  </div>
</template>
