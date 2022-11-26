export default interface TransactionDto{
  id?: number

  date?: any

  amount?: number

  previousAmount?: number

  categoryDto?: CategoryDto

  note?: string

  userDto?: UserDto
}
