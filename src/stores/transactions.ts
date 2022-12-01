import { useWalletsStore, useWalsStore } from './wallets';
import CategoryDto from './../models/TransactionDto.d';
import { defineStore } from 'pinia';
import TransactionDto from "../models/TransactionDto"
import WalletDto from "../models/WalletDto"
import axios from "../axios"

export type TransactionsState = {
    transactionsMap: Map<WalletDto,TransactionDto[]>,
    search: Search

}

export enum transactionType{
    INCOME,
    OUTCOME
}

export type Search = {
    startDate?: Date,
    endDate?: Date,
    category?: CategoryDto,
    type?: transactionType
}

export const useTransactionsStore = defineStore('transactions',{
    state: () => ({
        transactionsMap: new Map(),
        search: {}
    }) as TransactionsState,
    getters: {
        transactions(state: TransactionsState){
            return (wallet: WalletDto) : TransactionDto[] => {
                return (state.transactionsMap.get(wallet) ?? [])!;
            }
        },
        transaction(state: TransactionsState){
            return (id: number,wallet: WalletDto) : TransactionDto | undefined => {
                return state.transactionsMap.get(wallet)?.find(t => t.id === id);
            }
        }
    },
    actions: {
        async loadTransactions(wallet: WalletDto,force: boolean,search?: Search){
            if(force || search || this.transactions(wallet).length == 0){
                //TODO search filters
                let response = await axios.get<Array<TransactionDto>>(`api/transaction/${wallet.id}`);
                this.transactionsMap.set(wallet,response?.data ?? []);
                this.search = search ?? this.search;
            }
        },
        async save(wallet: WalletDto,transaction: TransactionDto){
            if(transaction.id){
                
                await axios.put(`api/transaction/`,{
                    walletDto: wallet,
                    transactionDto: transaction
                });
                
            }
            else{
                await axios.post(`api/transaction/`,{
                    walletDto: wallet,
                    transactionDto: transaction
                });
                const walletsStore = useWalletsStore();
                await walletsStore.refreshWallet(wallet);
            }
            await this.loadTransactions(wallet,true,undefined);
        },
        async delete(wallet: WalletDto,transaction: TransactionDto){
            const walletsStore = useWalletsStore();
            await axios.delete(`api/transaction/`,{data:{walletDto:wallet,transactionDto:transaction}});
            await walletsStore.refreshWallet(wallet);
            await this.loadTransactions(wallet,true,undefined);
        }
    }
});