import { AxiosError } from 'axios'

export interface User {
  id: number
  name: string
}

export interface UserState {
  users: User[]
  error: AxiosError | null
}

export interface Work {
  name: string
  startedAt: string | null
  finishedAt: string | null
  atOffice: boolean | null
  onWork: boolean | null
}

export interface WorkState {
  works: Work[]
  error: AxiosError | null
}

export interface RootState {
  users: UserState
  works: WorkState
}
