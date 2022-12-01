export default interface TransactionDto{
  id?: number

  date?: any

  name?: string

  amount?: number

  previousAmount?: number

  categoryDto?: CategoryDto

  note?: string

  userDto?: UserDto
}
