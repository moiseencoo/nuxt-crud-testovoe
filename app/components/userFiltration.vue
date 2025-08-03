<script setup lang="ts">
import { useUsersStore } from '~/stores/users'

const usersStore = useUsersStore()
const { searchFilter, companyFilter, userCompanies, sortDirection } = storeToRefs(usersStore)
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card class="mb-4">
                <v-card-title class="bg-primary text-white">
                    <v-icon start>mdi-magnify</v-icon>
                    Поиск
                </v-card-title>
                <v-card-text>
                    <v-text-field 
                        v-model="searchFilter"
                        label="Поиск по имени, email, телефону или компании" 
                        variant="underlined"
                        class="mt-4"
                        clearable
                        prepend-inner-icon="mdi-magnify"
                        placeholder="Введите текст для поиска..."
                    />
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card class="mb-4">
                <v-card-title class="bg-primary text-white">
                    <v-icon start>mdi-filter</v-icon>
                    Фильтр
                </v-card-title>
                <v-card-text>
                    <v-select
                        v-model="companyFilter"
                        label="Фильтр по компании"
                        class="mt-4"
                        variant="underlined"
                        clearable
                        :items="userCompanies"
                        placeholder="Выбрвть по компании"
                    />
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card class="mb-4">
                <v-card-title class="bg-primary text-white">
                    <v-icon start>mdi-filter</v-icon>
                    Сортировка
                </v-card-title>
                <v-card-text>
                    <v-btn-toggle
                        v-model="sortDirection"
                        color="primary"
                        class="mt-4"
                        mandatory
                    >
                        <v-btn value="asc">
                            <v-icon start>mdi-sort-alphabetical-ascending</v-icon>
                            А-Я
                        </v-btn>
                        <v-btn value="desc">
                            <v-icon start>mdi-sort-alphabetical-descending</v-icon>
                            Я-А
                        </v-btn>
                        <v-btn value="none">
                            <v-icon start>mdi-sort-alphabetical-ascending</v-icon>
                            Сбросить
                        </v-btn>
                    </v-btn-toggle>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>