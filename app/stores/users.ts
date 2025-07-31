import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUsers } from '~/composables/useUsers'
import { useUserFilters } from '~/composables/useUserFilters'

export const useUsersStore = defineStore('users', () => {
  const page = ref(1)
  const limit = ref(6)
  const { users, isLoading, error, refetch } = useUsers()
  const { filteredTotal } = useUserFilters(users, page, limit)
 
  const totalUsers = computed(() => filteredTotal?.value || users.value?.length || 0)
  const pageCount = computed(() => Math.ceil(totalUsers.value / limit.value))
  const limitOptions = [6, 12, 24]

  const setPage = (newPage: number) => {
    page.value = newPage
  }

  const setLimit = (newLimit: number) => {
    limit.value = newLimit
  }

  return {
    users,
    isLoading,
    error,
    page,
    limit,
    limitOptions,
    pageCount,
    refetch,
    setPage,
    setLimit,
  }
}) 