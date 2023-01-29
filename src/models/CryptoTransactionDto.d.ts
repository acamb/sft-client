export type CryptoTransactionType = 'BUY' | 'SELL' | 'TRANSFER'

export default interface CryptoTransactionDto{
    id: number
    price: number
    fiatValue: number
    fee: number
    taxable: boolean
    transactionType: CryptoTransactionType
}