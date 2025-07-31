<script setup lang="ts">
import { useUsersStore } from '~/stores/users'
import UserCard from '~/components/userCard.vue'
import { useUserFilters } from '~/composables/useUserFilters'

const usersStore = useUsersStore()
const { users, isLoading, error, page, limit, pageCount } = storeToRefs(usersStore)
const { setPage, setLimit, limitOptions, deleteUser } = usersStore


// Use the filtering composable
const { nameFilter, phoneFilter, letterFilter, filteredUsers, availableLetters, clearFilters } = useUserFilters(users, page, limit)

const handleLimitChange = (limit: number) => {
  setPage(1)
  setLimit(limit)
}

const handleLetterFilter = (letter: string) => {
  letterFilter.value = letterFilter.value === letter ? '' : letter
  setPage(1)
}

const handleDelete = async (id: string) => {
  await deleteUser(id)
  await usersStore.refetch()
}

const handleEdit = (id: string) => {
  console.log(id)
}

const goToCreate = () => {
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
            <v-btn @click="goToCreate" class="mb-4 ma-2" color="blue-darken-3" rounded="2" variant="flat">
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
            <v-card class="mb-6">
              <v-card-title class="bg-primary text-white">
                <v-icon start>mdi-account-group</v-icon>
                Фильтр
              </v-card-title>
              <div class="d-flex mx-4 my-4 gap-4">
                <v-text-field v-model="nameFilter" label="по имени" variant="underlined" clearable
                  @update:modelValue="handleLimitChange(limit)"></v-text-field>
                <v-text-field v-model="phoneFilter" label="по телефону" variant="underlined" clearable
                  @update:modelValue="handleLimitChange(limit)"></v-text-field>
                <v-btn @click="clearFilters" variant="outlined" color="secondary" class="mt-4">
                  Очистить
                </v-btn>
              </div>

              <!-- A-Z Letter Filter -->
              <div class="mx-4 mb-4">
                <div class="text-sm font-medium text-gray-700 mb-2">Фильтр по Фамилии:</div>
                <div class="d-flex flex-wrap gap-1">
                  <v-btn v-for="letter in availableLetters" :key="letter"
                    :variant="letterFilter === letter ? 'elevated' : 'outlined'"
                    :color="letterFilter === letter ? 'primary' : 'default'" size="small"
                    @click="handleLetterFilter(letter)" class="text-caption" min-width="32" height="32">
                    {{ letter }}
                  </v-btn>
                </div>
              </div>
            </v-card>

            <v-row>
              <v-col v-for="user in filteredUsers" :key="user.id" cols="12" sm="6" lg="4">
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
  </div>
</template>
