export interface CryptoWalletsInfo{
    wallets: Array<CryptoWalletInfo>
}

export interface CryptoWalletInfo{
    walletId: number,
    currentValue: number
}