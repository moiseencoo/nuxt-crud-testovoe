import { ref, computed } from 'vue'
import type { User } from '~/types/userTypes'

export const useUserFilters = (users: Ref<User[] | undefined>, page: Ref<number>, limit: Ref<number>) => {
  const nameFilter = ref('')
  const phoneFilter = ref('')
  const letterFilter = ref('')
  const filteredTotal = ref(0)

  const filteredUsers = computed(() => {
    if (!users.value) return []
    
    const filteredUsers = users.value.filter(user => {
      const nameMatch = !nameFilter.value || 
        user.name.toLowerCase().includes(nameFilter.value.toLowerCase())
      
      const phoneMatch = !phoneFilter.value || 
        user.phone.replace(/[^\d]/g, '').includes(phoneFilter.value.replace(/[^\d]/g, ''))
      
      const letterMatch = !letterFilter.value || 
        user.name.charAt(0).toLowerCase() === letterFilter.value.toLowerCase()
      
      return nameMatch && phoneMatch && letterMatch
    })

    filteredTotal.value = filteredUsers.length

    const start = (page.value - 1) * limit.value
    const end = start + limit.value
    return filteredUsers.slice(start, end)
  })

  // Get available letters from user names
  const availableLetters = computed(() => {
    if (!users.value) return []
    
    const letters = new Set<string>()
    users.value.forEach(user => {
      const firstLetter = user.name.charAt(0).toUpperCase()
      if (firstLetter.match(/[A-ZА-Я]/)) {
        letters.add(firstLetter)
      }
    })
    
    return Array.from(letters).sort()
  })

  const clearFilters = () => {
    nameFilter.value = ''
    phoneFilter.value = ''
    letterFilter.value = ''
  }

  return {
    nameFilter,
    phoneFilter,
    letterFilter,
    filteredUsers,
    availableLetters,
    filteredTotal,
    clearFilters
  }
} 