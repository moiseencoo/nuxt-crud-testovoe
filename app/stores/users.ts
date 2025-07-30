import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    getUsers: (state) => state.users,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('http://localhost:2311/users')
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        this.users = await response.json()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred'
        console.error('Error fetching users:', error)
      } finally {
        this.loading = false
      }
    }
  }
}) 