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

export const deleteUser = async (id: string): Promise<void> => {
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

export const updateUser = async (userData: TUser): Promise<void> => {
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