import { useQuery } from '@tanstack/vue-query'
import type { TUser } from '~/types/userTypes'

// API function
const fetchUsers = async (): Promise<TUser[]> => {
  try {
    const response = await fetch(`http://localhost:2311/users`)
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    const users = await response.json()
    return users || []
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export const useUsers = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return {
    users: data || [],
    isLoading,
    error,
    refetch
  }
} 