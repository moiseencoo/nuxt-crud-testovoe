import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUsers } from '~/composables/useUsers'
import { useUserFilters } from '~/composables/useUserFilters'
import type { TUser } from '~/types/userTypes'

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

  const updateUser = async (userData: TUser): Promise<void> => {
    try {
      const sanitizedUserData = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        company: {
          name: userData.company?.name
        }
      }

      const response = await fetch(`http://localhost:2311/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedUserData),
      })
      if (!response.ok) {
        throw new Error('Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
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
    updateUser,
  }
}) 