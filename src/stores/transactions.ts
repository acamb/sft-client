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
            }
            await this.loadTransactions(wallet,true,undefined);
        },
        async delete(wallet: WalletDto,transaction: TransactionDto){
            await axios.delete(`api/transaction/${transaction.id}`);
            await this.loadTransactions(wallet,true,undefined);
        }
    }
});