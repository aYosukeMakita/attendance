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

export interface History {
  name: string
  userId: number
  oldPresence: string
  newPresence: string
  createdAt: string
}

export interface HistoryState {
  histories: History[]
  error: AxiosError | null
}

export interface RootState {
  users: UserState
  histories: HistoryState
}
