import CryptoCurrency from "./CryptoCurrency";

export type WalletType = 'FIAT' | 'CRYPTO';

export default interface WalletDto{
  id?: number

  version?: number

  balance?: string

  name?: string

  description?: string

  walletType: WalletType

  currency: CryptoCurrency

  currentValue?: number
}
