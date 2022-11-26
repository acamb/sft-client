import { defineStore } from 'pinia';
import UserWalletDto from '../models/UserWalletDto';
import WalletDto from "../models/WalletDto"

export type WalletsState= {
    userWallets : UserWalletDto[]
}

export const useWalletsStore = defineStore('wallets',{
    state: ()=>({
        userWallets: <unknown> undefined
    } as WalletsState),
    getters :{
        wallets(state){
            return state.userWallets?.map(uw => uw.walletDto);
        },
        wallet(state) {
            return (id: number)=> state.userWallets?.map(uw => uw.walletDto)?.filter(w => w!.id === id)! as WalletDto;
        }
    },
    actions: {
        async loadUserWallet(force: boolean){
            //TODO
            console.log('loading wallets');
            return new Promise( resolve => setTimeout(resolve, 1000) )
        },
        async save(wallet: WalletDto){

        },
        async delete(wallet: WalletDto){
            
        }
    }
})