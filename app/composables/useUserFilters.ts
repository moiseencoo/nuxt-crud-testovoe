import { ref, computed } from 'vue'
import type { User } from '~/types/userTypes'

export const useUserFilters = (users: Ref<User[] | undefined>) => {
  const nameFilter = ref('')
  const phoneFilter = ref('')

  const filteredUsers = computed(() => {
    if (!users.value) return []
    
    return users.value.filter(user => {
      const nameMatch = !nameFilter.value || 
        user.name.toLowerCase().includes(nameFilter.value.toLowerCase())
      
      const phoneMatch = !phoneFilter.value || 
        user.phone.replace(/[^\d]/g, '').includes(phoneFilter.value.replace(/[^\d]/g, ''))
      
      return nameMatch && phoneMatch
    })
  })

  const clearFilters = () => {
    nameFilter.value = ''
    phoneFilter.value = ''
  }

  return {
    nameFilter,
    phoneFilter,
    filteredUsers,
    clearFilters
  }
} 