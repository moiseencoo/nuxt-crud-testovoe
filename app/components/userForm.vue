<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    formData: {
        name: string
        email: string
        phone: string
        company?: { name?: string }
    },
    isSubmitting: boolean
}>()
const emit = defineEmits<{ (e: 'submit', data: TUser): void }>()

const formData = computed(() => props.formData)

// Validation rules
const rules = {
    required: (value: string) => !!value || 'Это поле обязательно для заполнения',
    minLength: (value: string) => value.length >= 2 || 'Минимум 2 символа',
    email: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) || 'Введите корректный email'
    },
    phone: (value: string) => {
        const phoneRegex = /^[\+]?(?:[0-9][\s\-\(\)]*){7,}$/
        return phoneRegex.test(value) || 'Введите корректный номер телефона'
    }
}

const form = ref()

const handleSubmit = async () => {
    const { valid } = await form.value.validate()
    if (!valid) return

    emit('submit', formData.value)
}

</script>

<template>
    <v-card class="pa-6">
        <v-form @submit.prevent="handleSubmit" ref="form">
            <v-row>
                <!-- Name Field -->
                <v-col cols="12">
                    <v-text-field v-model="formData.name" label="ФИО пациента" variant="outlined"
                        :rules="[rules.required, rules.minLength]" validate-on="blur" required
                        prepend-inner-icon="mdi-account"></v-text-field>
                </v-col>

                <!-- Email Field -->
                <v-col cols="12" md="6">
                    <v-text-field v-model="formData.email" label="Email" variant="outlined" type="email"
                        :rules="[rules.required, rules.email]" validate-on="blur" required
                        prepend-inner-icon="mdi-email"></v-text-field>
                </v-col>

                <!-- Phone Field -->
                <v-col cols="12" md="6">
                    <v-text-field v-model="formData.phone" label="Телефон" variant="outlined"
                        :rules="[rules.required, rules.phone]" validate-on="blur" required
                        prepend-inner-icon="mdi-phone" placeholder="+7 (999) 123-45-67"></v-text-field>
                </v-col>

                <!-- Company Name Field -->
                <v-col cols="12">
                    <v-text-field v-model="formData.company.name" label="Название компании" variant="outlined" validate-on="blur" required
                        prepend-inner-icon="mdi-domain"></v-text-field>
                </v-col>

                <!-- Submit Button -->
                <v-col cols="12" class="d-flex justify-center">
                    <v-btn type="submit" color="primary" size="large" :loading="isSubmitting" :disabled="isSubmitting"
                        class="px-8">
                        <v-icon start>mdi-plus</v-icon>
                        {{ isSubmitting ? 'Обработка...' : 'Сохранить' }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>