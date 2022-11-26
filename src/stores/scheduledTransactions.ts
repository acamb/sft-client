import CategoryDto from '../models/CategoryDto';
import { defineStore } from 'pinia';
import ScheduledTransactionDto from "../models/ScheduledTransactionDto"
import WalletDto from "../models/WalletDto"

export type TransactionsState = {
    transactionsMap: Map<WalletDto,ScheduledTransactionDto[]>

}
export type Search = {
    date?: Date,
    note?: string,
    category?: CategoryDto,
    id?: number
}

export const useTransactionsStore = defineStore('transactions',{
    state: () => ({
        transactionsMap: new Map()
    }) as TransactionsState,
    getters: {
        transactions(state: TransactionsState){
            return (wallet: WalletDto) : ScheduledTransactionDto[] => {
                return (state.transactionsMap.get(wallet) ? state.transactionsMap.get(wallet) : [])!;
            }
        },
        search(state){
            return (wallet: WalletDto,search: Search)=> {
                let filtered: ScheduledTransactionDto[] = [];
                if(search.id){
                    return this.transactions(wallet)?.filter(t => t.id === search.id);
                }
                if(search.category){
                    filtered = this.transactions(wallet)?.filter(t => t.categoryDto === search.category);
                }
                if(search.date){
                    filtered = this.transactions(wallet)?.filter(t => t.date === search.date);
                }
                return filtered;
            }
        }
    },
    actions: {
        async loadScheduledTransactions(wallet: WalletDto,force: boolean){
            //TODO
        },
        async save(wallet: WalletDto,scheduled: ScheduledTransactionDto){
            //TODO
        },
        async delete(wallet: WalletDto,scheduled: ScheduledTransactionDto){
            //TODO
        }
    }
});