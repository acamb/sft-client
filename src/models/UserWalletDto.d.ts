import WalletDto from "./WalletDto"
export default interface UserWalletDto{
  id?: number

  read?: boolean

  write?: boolean

  owner?: boolean

  walletDto: WalletDto
}
