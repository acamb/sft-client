import CryptoTransactionDto from "./CryptoTransactionDto";
import UserDto from "./UserDto";
import CategoryDto from "./CategoryDto";

export default interface TransactionDto{
  id?: number

  date?: Date

  name?: string

  amount?: number

  previousAmount?: number

  categoryDto?: CategoryDto

  note?: string

  userDto?: UserDto

  scheduled?: boolean

  cryptoTransaction?: CryptoTransactionDto
}
