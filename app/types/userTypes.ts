export interface TUser {
    id?: number | string
    name: string
    email: string
    phone: string
    company?: {
        name?: string
    }
}
