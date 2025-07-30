<template>
  <div class="min-h-screen bg-gray-50">
    <v-container class="py-8">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">
              Users Directory
            </h1>
            <p class="text-lg text-gray-600">
              Manage and view user information
            </p>
          </div>

          <!-- Loading State -->
          <v-card v-if="isLoading" class="mb-6">
            <v-card-text class="text-center py-8">
              <v-progress-circular
                indeterminate
                color="primary"
                size="64"
              ></v-progress-circular>
              <p class="mt-4 text-gray-600">Loading users...</p>
            </v-card-text>
          </v-card>

          <!-- Error State -->
          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            class="mb-6"
          >
            {{ error }}
          </v-alert>

          <!-- Users List -->
          <div v-if="!isLoading && !error">
            <v-card class="mb-6">
              <v-card-title class="bg-primary text-white">
                <v-icon start>mdi-account-group</v-icon>
                Users ({{ users.length }})
              </v-card-title>
            </v-card>

            <v-row>
              <v-col
                v-for="user in users"
                :key="user.id"
                cols="12"
                sm="6"
                lg="4"
              >
                <v-card
                  class="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  elevation="2"
                >
                  <v-card-text class="pa-6">
                    <div class="flex items-center mb-4">
                      <v-avatar
                        color="primary"
                        size="48"
                        class="mr-4"
                      >
                        <span class="text-white text-lg font-semibold">
                          {{ user.name.charAt(0).toUpperCase() }}
                        </span>
                      </v-avatar>
                      <div>
                        <h3 class="text-lg font-semibold text-gray-900">
                          {{ user.name }}
                        </h3>
                        <p class="text-sm text-gray-600">
                          {{ user.company.name }}
                        </p>
                      </div>
                    </div>

                    <div class="space-y-3">
                      <div class="flex items-center">
                        <v-icon size="small" color="primary" class="mr-2">
                          mdi-email
                        </v-icon>
                        <span class="text-sm text-gray-700">{{ user.email }}</span>
                      </div>

                      <div class="flex items-center">
                        <v-icon size="small" color="primary" class="mr-2">
                          mdi-phone
                        </v-icon>
                        <span class="text-sm text-gray-700">{{ user.phone }}</span>
                      </div>

                      <div class="flex items-center">
                        <v-icon size="small" color="primary" class="mr-2">
                          mdi-web
                        </v-icon>
                        <a
                          :href="user.website"
                          target="_blank"
                          class="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          {{ user.website }}
                        </a>
                      </div>
                    </div>
                  </v-card-text>

                  <v-card-actions class="pa-4 pt-0">
                    <v-btn
                      variant="outlined"
                      color="primary"
                      size="small"
                      class="flex-1"
                    >
                      View Details
                    </v-btn>
                    <v-btn
                      variant="outlined"
                      color="secondary"
                      size="small"
                      class="flex-1 ml-2"
                    >
                      Edit
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <!-- Empty State -->
            <v-card v-if="users.length === 0" class="text-center py-12">
              <v-icon size="64" color="grey" class="mb-4">
                mdi-account-off
              </v-icon>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                No Users Found
              </h3>
              <p class="text-gray-600">
                There are no users to display at the moment.
              </p>
            </v-card>
          </div>

          <!-- Refresh Button -->
          <div class="text-center mt-8">
            <v-btn
              color="primary"
              size="large"
              @click="fetchUsers"
              :loading="isLoading"
              prepend-icon="mdi-refresh"
            >
              Refresh Users
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUsersStore } from '~/stores/users'

const usersStore = useUsersStore()

const { users, isLoading, error } = storeToRefs(usersStore)
const { fetchUsers } = usersStore

onMounted(() => {
  fetchUsers()
})
</script>
