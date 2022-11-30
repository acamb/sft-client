export type RecurrentType = string | 'WEEKLY' | 'MONTHLY'

export default interface ScheduledTransactionDto{
  id?: number

  date?: any

  amount?: number

  recurrent?: boolean

  type?: RecurrentType

  endDate?: any

  dayOfMonth?: number

  dayOfWeek?: number

  categoryDto?: CategoryDto

  nextFire?: Date

  name?: string
}
