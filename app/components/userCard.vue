<script setup lang="ts">
import type { User } from '~/types/userTypes'

defineProps<{ user: User }>()
const emit = defineEmits(['view', 'edit'])

</script>
<template>
    <v-card class="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1" elevation="2">
        <v-card-text class="pa-6">
            <div class="flex items-center mb-4">
                <v-avatar color="primary" size="48" class="mr-4">
                    <span class="text-white text-lg font-semibold"> {{ user.name.charAt(0).toUpperCase() }} </span>
                </v-avatar>
                <div>
                    <h3 class="text-lg font-semibold text-gray-900"> {{ user.name }} </h3>
                    <p class="text-sm text-gray-600"> {{ user.company.name }} </p>
                </div>
            </div>

            <div class="space-y-3">
                <div class="flex items-center">
                    <v-icon size="small" color="primary" class="mr-2"> mdi-email </v-icon>
                    <span class="text-sm text-gray-700">{{ user.email }}</span>
                </div>

                <div class="flex items-center">
                    <v-icon size="small" color="primary" class="mr-2"> mdi-phone </v-icon>
                    <span class="text-sm text-gray-700">{{ user.phone }}</span>
                </div>
            </div>
        </v-card-text>

        <v-card-actions class="pa-4 pt-0">
            <v-btn variant="outlined" color="primary" size="small" class="flex-1" @click="emit('view', user.id)">
                {{ 'Посмотреть' }}
            </v-btn>
            <v-btn variant="outlined" color="secondary" size="small" class="flex-1 ml-2" @click="emit('edit', user.id)">
                {{ 'Редактировать' }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
