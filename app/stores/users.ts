import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUsers } from '~/composables/useUsers'
import { useUserFilters } from '~/composables/useUserFilters'

export const useUsersStore = defineStore('users', () => {
  const page = ref(1)
  const limit = ref(6)
  const { users, isLoading, error, refetch } = useUsers()
  const { getFilteredUsersCount } = useUserFilters(users, page, limit)
 
  const totalUsers = computed(() => getFilteredUsersCount?.value || users.value?.length || 0)
  const pageCount = computed(() => Math.ceil(totalUsers.value / limit.value))
  const limitOptions = [6, 12, 24]

  const setPage = (newPage: number) => {
    page.value = newPage
  }

  const setLimit = (newLimit: number) => {
    limit.value = newLimit
  }

  const deleteUser = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:2311/users/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
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
    deleteUser,
  }
}) 