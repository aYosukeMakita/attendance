import { AxiosError } from 'axios'

export type Presence = 'working' | 'finished' | 'break'

export interface User {
  id: number
  name: string
  presence: Presence
  atOffice: boolean
}

export interface UserState {
  users: User[]
  error: AxiosError | null
}

export interface Work {
  name: string
  userId: number
  oldPresence: string | null
  newPresence: string | null
}

export interface WorkState {
  works: Work[]
  error: AxiosError | null
}

export interface RootState {
  users: UserState
  works: WorkState
}
