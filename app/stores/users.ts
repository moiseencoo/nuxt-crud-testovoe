import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useUsers } from '~/composables/useUsersApi'
import { useUserFilters } from '~/composables/useUserFilters'

export const useUsersStore = defineStore('users', () => {
  const page = ref(1)
  const limit = ref(6)
  const searchFilter = ref('')
  const companyFilter = ref<string>('')
  const sortDirection = ref<'asc' | 'desc' | 'none'>('none')
  const { users, isLoading, error, refetch } = useUsers()
  const { filteredUsers: filteredUsersBySearch, clearFilters, userCompanies, filteredUsersByCompany } = useUserFilters(users, searchFilter, companyFilter as Ref<string>)
 
  const totalUsers = computed(() => usersList?.value.length || users.value?.length || 0)
  const pageCount = computed(() => Math.ceil(totalUsers.value / limit.value))
  const limitOptions = [6, 12, 24]

  // Reset page when search filter changes
  watch(searchFilter, () => {
    page.value = 1
  })

  const setPage = (newPage: number) => {
    page.value = newPage
  }

  const setLimit = (newLimit: number) => {
    limit.value = newLimit
  }

  const sortUsers = (users: TUser[]) => {
    if (sortDirection.value === 'asc') {
      return users.sort((a, b) => a.name.localeCompare(b.name))
    }
    return users.sort((a, b) => b.name.localeCompare(a.name))
  }

  const usersList = computed(() => {
    const userList = companyFilter.value ? filteredUsersByCompany.value : filteredUsersBySearch.value
    if (sortDirection.value === 'none') {
      return userList
    }
    return sortUsers([...userList])
  })

  const filteredUsers = computed(() => {
    const start = (page.value - 1) * limit.value
    const end = start + limit.value
    return usersList.value.slice(start, end)
  })

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
    filteredUsers,
    searchFilter,
    companyFilter,
    clearFilters,
    userCompanies,
    sortDirection,
  }
}) 