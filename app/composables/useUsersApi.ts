import { useQuery } from '@tanstack/vue-query'
import type { TUser } from '~/types/userTypes'
import { z } from 'zod'

const API_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NUXT_PUBLIC_API_URL || 'https://your-backend-url.railway.app'
  : 'http://localhost:2311'
export const API_URL_USERS = `${API_URL}/api/users`

// Validation schemas
const CompanySchema = z.object({
  name: z.string().optional()
})

const UserSchema = z.object({
  id: z.union([z.string(), z.number().transform(num => num.toString())]),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  company: CompanySchema.optional()
})

const UsersArraySchema = z.array(UserSchema)

// Validation function
const validateUser = (data: unknown): TUser => {
  return UserSchema.parse(data)
}

const validateUsers = (data: unknown): TUser[] => {
  return UsersArraySchema.parse(data)
}

// API function
const fetchUsers = async (): Promise<TUser[]> => {
  try {
    const response = await fetch(API_URL_USERS)
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    const rawData = await response.json()
    const users = validateUsers(rawData)
    return users || []
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Data validation error:', error.errors)
      throw new Error('Invalid data format received from server')
    }
    console.error('Error fetching users:', error)
    return []
  }
}

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL_USERS}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete user')
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

export const updateUser = async (userData: TUser): Promise<void> => {
  try {
    // Validate input data
    const validatedUserData = validateUser(userData)
    
    const sanitizedUserData = {
      id: validatedUserData.id,
      name: validatedUserData.name,
      email: validatedUserData.email,
      phone: validatedUserData.phone,
      company: {
        name: validatedUserData.company?.name
      }
    }

    const response = await fetch(`${API_URL_USERS}/${validatedUserData.id}`, {
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
    if (error instanceof z.ZodError) {
      console.error('Input validation error:', error.errors)
      throw new Error('Invalid user data provided')
    }
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