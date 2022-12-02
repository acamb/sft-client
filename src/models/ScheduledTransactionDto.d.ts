export type RecurrentType = string | 'WEEKLY' | 'MONTHLY'

export default interface ScheduledTransactionDto{
  id?: number

  date?: Date

  amount?: number

  recurrent?: boolean

  recurrentFrequency: number

  type?: RecurrentType

  endDate?: Date

  dayOfMonth?: number

  dayOfWeek?: number

  categoryDto?: CategoryDto

  nextFire?: Date

  name?: string
}
