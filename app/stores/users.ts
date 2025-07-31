import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUsers } from '~/composables/useUsers'

export const useUsersStore = defineStore('users', () => {
  const page = ref(1)
  const limit = ref(6)
  const { users, isLoading, error, refetch } = useUsers()

  // For pagination controls
  const total = computed(() => 0)
  const pageCount = computed(() => Math.ceil(total.value / limit.value))
  function setPage(newPage: number) {
    page.value = newPage
  }

  return {
    users,
    total,
    isLoading,
    error,
    page,
    limit,
    pageCount,
    refetch,
    setPage,
  }
}) 