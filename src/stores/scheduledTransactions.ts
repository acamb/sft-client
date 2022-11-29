import CategoryDto from '../models/CategoryDto';
import { defineStore } from 'pinia';
import ScheduledTransactionDto from "../models/ScheduledTransactionDto"
import WalletDto from "../models/WalletDto"
import axios from "../axios"

export type TransactionsState = {
    transactionsMap: Map<WalletDto,ScheduledTransactionDto[]>

}
export type Search = {
    date?: Date,
    note?: string,
    category?: CategoryDto,
    id?: number
}

export const useScheduledTransactionsStore = defineStore('transactions',{
    state: () => ({
        transactionsMap: new Map()
    }) as TransactionsState,
    getters: {
        transactions(state: TransactionsState){
            return (wallet: WalletDto) : ScheduledTransactionDto[] => {
                return (state.transactionsMap.get(wallet) ?? [])!;
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
            if(force ||  this.transactions(wallet).length == 0){
                //TODO search filters
                let response = await axios.get<Array<ScheduledTransactionDto>>(`/api/scheduled/${wallet.id}`);
                this.transactionsMap.set(wallet,response?.data ?? []);
            }
        },
        async save(wallet: WalletDto,scheduled: ScheduledTransactionDto){
            if(scheduled.id){
                await axios.put("/api/scheduled/",{
                    wallet,
                    scheduledTransaction: scheduled
                });
            }
            else{
                await axios.post("/api/scheduled/",{
                    wallet,
                    scheduledTransaction: scheduled
                });
            }
            await this.loadScheduledTransactions(wallet,true);
        },
        async delete(wallet: WalletDto,scheduled: ScheduledTransactionDto){
            await axios.delete("/api/scheduled/",{
                data:{
                    wallet,
                    scheduledTransaction: scheduled
                }
            });
            await this.loadScheduledTransactions(wallet,true);
        }
    }
});