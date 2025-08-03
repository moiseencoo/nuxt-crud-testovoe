import { describe, it, expect, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useUserFilters } from '~/composables/useUserFilters'
import type { TUser } from '~/types/userTypes'

describe('useUserFilters', () => {
  let users: Ref<TUser[]>
  let searchFilter: Ref<string>
  let companyFilter: Ref<string>

  const mockUsers: TUser[] = [
    {
      id: 1,
      name: 'Алексеев Алексей',
      email: 'a.alekseev@example.com',
      phone: '+7-555-123-4567',
      company: { name: 'Tech Corp' }
    },
    {
      id: 2,
      name: 'Борисов Борис',
      email: 'b.borisov@company.com',
      phone: '+7-555-987-6543',
      company: { name: 'Design Studio' }
    },
    {
      id: 3,
      name: 'Васильев Василий',
      email: 'v.vasiliev@techcorp.com',
      phone: '+7-555-456-7890',
      company: { name: 'Tech Corp' }
    },
    {
      id: 4,
      name: 'Григорьев Григорий',
      email: 'g.grigoryev@startup.io',
      phone: '+7-555-111-2222',
      company: { name: 'Startup Inc' }
    },
    {
      id: 5,
      name: 'Дмитриев Дмитрий',
      email: 'd.dmitriev@freelance.com',
      phone: '+7-555-333-4444'
      // No company
    }
  ]

  beforeEach(() => {
    users = ref(mockUsers)
    searchFilter = ref('')
    companyFilter = ref('')
  })

  describe('filteredUsers', () => {
    it('should return all users when no search filter is applied', () => {
      const { filteredUsers } = useUserFilters(users, searchFilter, companyFilter)

      expect(filteredUsers.value).toHaveLength(5)
      expect(filteredUsers.value).toEqual(mockUsers)
    })

    it('should return empty array when users is undefined', () => {
      const undefinedUsers = ref<TUser[] | undefined>(undefined)
      const { filteredUsers } = useUserFilters(undefinedUsers, searchFilter, companyFilter)

      expect(filteredUsers.value).toEqual([])
    })

    it('should filter users by name (case insensitive)', () => {
      searchFilter.value = 'борис'
      const { filteredUsers } = useUserFilters(users, searchFilter, companyFilter)

      expect(filteredUsers.value).toHaveLength(1)
      expect(filteredUsers.value[0].name).toBe('Борисов Борис')
    })

    it('should filter users by email (case insensitive)', () => {
      searchFilter.value = 'a.alekseev'
      const { filteredUsers } = useUserFilters(users, searchFilter, companyFilter)

      expect(filteredUsers.value).toHaveLength(1)
      expect(filteredUsers.value[0].email).toBe('a.alekseev@example.com')
    })

    it('should filter users by company name (case sensitive)', () => {
      searchFilter.value = 'Tech Corp'
      const { filteredUsers } = useUserFilters(users, searchFilter, companyFilter)

      expect(filteredUsers.value).toHaveLength(2)
      expect(filteredUsers.value.map(u => u.name)).toContain('Алексеев Алексей')
      expect(filteredUsers.value.map(u => u.name)).toContain('Васильев Василий')
    })

    it('should filter users by phone number (ignoring formatting)', () => {
      searchFilter.value = '555-123-4567'
      const { filteredUsers } = useUserFilters(users, searchFilter, companyFilter)

      expect(filteredUsers.value).toHaveLength(1)
      expect(filteredUsers.value[0].name).toBe('Алексеев Алексей')
    })

    it('should filter users by phone number with different formatting', () => {
      searchFilter.value = '5551234567'
      const { filteredUsers } = useUserFilters(users, searchFilter, companyFilter)

      expect(filteredUsers.value).toHaveLength(1)
      expect(filteredUsers.value[0].name).toBe('Алексеев Алексей')
    })

    it('should handle users without company information', () => {
      searchFilter.value = 'Дмитрий'
      const { filteredUsers } = useUserFilters(users, searchFilter, companyFilter)

      expect(filteredUsers.value).toHaveLength(1)
      expect(filteredUsers.value[0].name).toBe('Дмитриев Дмитрий')
    })

    it('should handle empty search filter', () => {
      searchFilter.value = ''
      const { filteredUsers } = useUserFilters(users, searchFilter, companyFilter)

      expect(filteredUsers.value).toHaveLength(5)
    })

    describe('filteredUsersByCompany', () => {
      it('should filter by company name (case insensitive)', () => {
        companyFilter.value = 'Tech Corp'
        const { filteredUsersByCompany } = useUserFilters(users, searchFilter, companyFilter)

        expect(filteredUsersByCompany.value).toHaveLength(2)
        expect(filteredUsersByCompany.value.map(u => u.name)).toContain('Алексеев Алексей')
        expect(filteredUsersByCompany.value.map(u => u.name)).toContain('Васильев Василий')
      })

      it('should NOT return users with partial company name matches', () => {
        companyFilter.value = 'tech'
        const { filteredUsersByCompany } = useUserFilters(users, searchFilter, companyFilter)

        expect(filteredUsersByCompany.value).toHaveLength(0)
      })

      it('should combine search and company filters', () => {
        searchFilter.value = 'василий'
        companyFilter.value = 'Tech Corp'
        const { filteredUsersByCompany } = useUserFilters(users, searchFilter, companyFilter)

        expect(filteredUsersByCompany.value).toHaveLength(1)
        expect(filteredUsersByCompany.value[0].name).toBe('Васильев Василий')
      })
    })

    describe('userCompanies', () => {
      it('should return unique list of company names', () => {
        const { userCompanies } = useUserFilters(users, searchFilter, companyFilter)

        expect(userCompanies.value).toHaveLength(4)
        expect(userCompanies.value).toContain('Tech Corp')
        expect(userCompanies.value).toContain('Design Studio')
        expect(userCompanies.value).toContain('Startup Inc')
        expect(userCompanies.value).toContain(undefined) // For users without company
      })
    })

    describe('Edge cases and error handling', () => {
      it('should handle empty users array', () => {
        const emptyUsers = ref<TUser[]>([])
        const { filteredUsers, filteredUsersByCompany, userCompanies } = useUserFilters(emptyUsers, searchFilter, companyFilter)

        expect(filteredUsers.value).toEqual([])
        expect(filteredUsersByCompany.value).toEqual([])
        expect(userCompanies.value).toEqual([])
      })

      it('should handle phone numbers with various formats', () => {
        const usersWithDifferentPhoneFormats = ref<TUser[]>([
          {
            id: 1,
            name: 'User 1',
            email: 'user1@test.com',
            phone: '+7-555-123-4567'
          },
          {
            id: 2,
            name: 'User 2',
            email: 'user2@test.com',
            phone: '5551234567'
          },
          {
            id: 3,
            name: 'User 3',
            email: 'user3@test.com',
            phone: '(555) 123-4567'
          }
        ])

        searchFilter.value = '5551234567'
        const { filteredUsers } = useUserFilters(usersWithDifferentPhoneFormats, searchFilter, companyFilter)

        expect(filteredUsers.value).toHaveLength(3)
      })
    })
  })
})