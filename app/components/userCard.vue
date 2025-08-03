<script setup lang="ts">
import type { TUser } from '~/types/userTypes'

const props = defineProps<{ user: TUser }>()
const emit = defineEmits(['delete', 'edit'])

const showDeleteDialog = ref(false)

const handleDelete = () => {
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  emit('delete', props.user.id)
  showDeleteDialog.value = false
}

const cancelDelete = () => {
  showDeleteDialog.value = false
}
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
                    <p v-if="user.company?.name" class="text-sm text-gray-600"> {{ user.company.name }} </p>
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
            <v-btn variant="tonal" color="red-darken-3" size="small" class="flex-1" @click="handleDelete">
                {{ 'Удалить' }}
            </v-btn>
            <v-btn variant="outlined" color="green-accent-4" size="small" class="flex-1 ml-2" @click="emit('edit', user.id)">
                {{ 'Редактировать' }}
            </v-btn>
        </v-card-actions>
    </v-card>

    <!-- Подтверждение удаления -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
        <v-card>
            <v-card-title class="text-h6">
                Подтверждение удаления
            </v-card-title>
            <v-card-text>
                Вы уверены, что хотите удалить пациента "{{ user.name }}" из базы?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="text" @click="cancelDelete">
                    Отмена
                </v-btn>
                <v-btn variant="tonal" color="red-darken-3" @click="confirmDelete">
                    Удалить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
