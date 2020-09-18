import { AxiosError } from 'axios'

export type Presence = 'working' | 'finished' | 'break'
export type Location = 'office' | 'home'

export interface User {
  userId: number
  username: string
  nickname: string | null
  presence: Presence
  location: Location
}

export interface UserState {
  users: User[]
  error: AxiosError | null
}

export interface History {
  oldPresence: Presence
  newPresence: Presence
  time: string
}

export interface HistoryState {
  userId: number
  username: string
  nickname: string | null
  histories: History[]
  error: AxiosError | null
}

export interface RootState {
  users: UserState
  histories: HistoryState
}
