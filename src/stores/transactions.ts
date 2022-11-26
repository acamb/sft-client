import CategoryDto from './../models/TransactionDto.d';
import { defineStore } from 'pinia';
import TransactionDto from "../models/TransactionDto"
import WalletDto from "../models/WalletDto"

export type TransactionsState = {
    transactionsMap: Map<WalletDto,TransactionDto[]>

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
        transactionsMap: new Map()
    }) as TransactionsState,
    getters: {
        transactions(state: TransactionsState){
            return (wallet: WalletDto) : TransactionDto[] => {
                return (state.transactionsMap.get(wallet) ? state.transactionsMap.get(wallet) : [])!;
            }
        }
    },
    actions: {
        async loadTransactions(wallet: WalletDto,force: boolean,search: Search){
            //TODO
            
        },
        async save(wallet: WalletDto,transaction: TransactionDto){

        },
        async delete(wallet: WalletDto,transaction: TransactionDto){
            
        }
    }
});