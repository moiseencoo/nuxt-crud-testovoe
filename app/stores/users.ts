import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUsers } from '~/composables/useUsers'

export const useUsersStore = defineStore('users', () => {
  const page = ref(1)
  const limit = ref(6)
  const { users, isLoading, error, refetch } = useUsers()

  // For pagination controls
  const total = computed(() => users.value?.length || 0)
  const pageCount = computed(() => Math.ceil(total.value / limit.value))
  const limitOptions = [6, 12, 24]

  const setPage = (newPage: number) => {
    page.value = newPage
  }

  const setLimit = (newLimit: number) => {
    limit.value = newLimit
  }

  // Get paginated users based on current page and limit
  const paginatedUsers = computed(() => {
    if (!users.value) return []
    const start = (page.value - 1) * limit.value
    const end = start + limit.value
    return users.value.slice(start, end)
  })

  return {
    users: paginatedUsers,
    total,
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