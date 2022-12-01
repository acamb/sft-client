export type RecurrentType = string | 'WEEKLY' | 'MONTHLY'

export default interface ScheduledTransactionDto{
  id?: number

  date?: any

  amount?: number

  recurrent?: boolean

  recurrentFrequency: number

  type?: RecurrentType

  endDate?: any

  dayOfMonth?: number

  dayOfWeek?: number

  categoryDto?: CategoryDto

  nextFire?: Date

  name?: string
}
