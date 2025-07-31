<script setup lang="ts">
import { useUsersStore } from '~/stores/users'
import UserCard from '~/components/userCard.vue'
import { useUserFilters } from '~/composables/useUserFilters'

const usersStore = useUsersStore()
const { users, isLoading, error, page, pageCount } = storeToRefs(usersStore)
const { setPage, setLimit, limit, limitOptions } = usersStore

// Use the filtering composable
const { nameFilter, phoneFilter, filteredUsers, clearFilters } = useUserFilters(users)

const handleLimitChange = (limit: number) => {
  setPage(1)
  setLimit(limit)
}

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <v-container class="py-8">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">
              {{ 'Карточки пациентов' }}
            </h1>
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
                Поиск среди пациентов
              </v-card-title>
              <div class="d-flex mx-4 my-4 gap-4">
                <v-text-field v-model="nameFilter" label="по имени" variant="underlined" clearable></v-text-field>
                <v-text-field v-model="phoneFilter" label="по телефону" variant="underlined" clearable></v-text-field>
                <v-btn @click="clearFilters" variant="outlined" color="secondary" class="mt-4">
                  Очистить
                </v-btn>
              </div>
            </v-card>

            <v-row>
              <v-col v-for="user in filteredUsers" :key="user.id" cols="12" sm="6" lg="4">
                <UserCard :user="user" />
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

        </v-col>
      </v-row>
      <div class="d-flex justify-center align-baseline">
        <v-pagination v-model="page" :length="pageCount" @update:modelValue="setPage" class="mt-8 flex-grow-1" />
        <v-select
          v-model="limit"
          :items="limitOptions"
          label="Количество на странице"
          density="compact"
          variant="underlined"
          @update:modelValue="handleLimitChange"
        ></v-select>
      </div>
    </v-container>
  </div>
</template>
