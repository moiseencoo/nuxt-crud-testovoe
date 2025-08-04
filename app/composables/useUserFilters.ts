import { computed } from 'vue'
import type { TUser } from '~/types/userTypes'

export const useUserFilters = (users: Ref<TUser[] | undefined>, searchFilter: Ref<string>, companyFilter: Ref<string>) => {
  const filteredUsers = computed(() => {
    if (!users.value) return []
    
    const filteredUsers = users.value.filter(user => {
      if (!searchFilter.value) return true
      
      const searchTerm = searchFilter.value.toLowerCase()
      
      // Search across all user fields
      const nameMatch = user.name.toLowerCase().includes(searchTerm)
      const emailMatch = user.email.toLowerCase().includes(searchTerm)
      const companyMatch = user.company?.name?.toLowerCase().includes(searchTerm) || false
      const phoneMatch = user.phone.replace(/[-+()\s]/g, '').includes(searchFilter.value.replace(/[-+\s]/g, ''))
      
      return nameMatch || emailMatch || companyMatch || phoneMatch
    })

    return filteredUsers
  })

  const filteredUsersByCompany = computed(() => {
    if (!filteredUsers.value || !companyFilter.value) return []
    return filteredUsers.value.filter(user => {
      if (!user.company?.name) return false
      return user.company.name === companyFilter.value
    })
  })

  const userCompanies = computed(() => {
    if (!users.value) return []
    const set = [...new Set(users.value.map(user => user.company?.name))]
    return set.filter(company => company)
  })

  return {
    filteredUsers,
    filteredUsersByCompany,
    userCompanies,
  }
} 