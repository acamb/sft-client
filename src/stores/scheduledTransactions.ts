import { initialPageRequest } from './transactions';
import { PageRequest } from './PageRequest';
import { PaginatedResponse } from './PaginatedResponse';
import CategoryDto from '../models/CategoryDto';
import { defineStore } from 'pinia';
import ScheduledTransactionDto from "../models/ScheduledTransactionDto"
import WalletDto from "../models/WalletDto"
import axios from "../axios"

export type TransactionsState = {
    transactions: ScheduledTransactionDto[],
    search?: Search,
    page: number,
    max: number,
    totalPages: number,
    totalElements: number,
    wallet?: WalletDto,
    pageRequest: PageRequest
}
export type Search = {
    startDate?: Date,
    endDate?: Date,
    category?: CategoryDto,
    name?: string
}

export const useScheduledTransactionsStore = defineStore('scheduledTransactions',{
    state: () => ({
        transactions: [],
        page: 0,
        max: 10,
        totalElements: 0,
        totalPages: 0,
        wallet: undefined,
        pageRequest: initialPageRequest
    }) as TransactionsState,
    getters: {
        transaction(state: TransactionsState){
            return (transactionId: number,wallet: WalletDto) : ScheduledTransactionDto | undefined => {
                if(wallet != state.wallet){
                    throw new Error('not loaded?');
                }
                return state.transactions?.find(t => t.id === transactionId);
            }
        }
    },
    actions: {
        async loadScheduledTransactions(wallet: WalletDto,force: boolean,page?: PageRequest,search?: Search){
            if(force || search != this.search || page != this.pageRequest ||  this.transactions.length == 0){
                this.search = search ?? this.search;
                let pageRequest = page ?? this.pageRequest;
                let query = `page=${pageRequest.page}&size=${pageRequest.size}`
                if(this.search?.startDate){
                    query += `&startDate=${this.search.startDate.toISOString()}`
                }
                if(this.search?.endDate){
                    query += `&endDate=${this.search.endDate.toISOString()}`
                }
                if(this.search?.name){
                    query += `&name=${this.search.name}`
                }
                if(this.search?.category){
                    query += `&category=${this.search.category.id}`
                }
                let response = await axios.get<PaginatedResponse<ScheduledTransactionDto>>(`/api/scheduled/${wallet.id}?${query}`);
                this.transactions = response.data.items || [];
                this.totalElements = response.data.totalItems;
                this.totalPages = response.data.totalPages;
                this.page = response.data.currentPage;
                this.wallet = wallet;
                this.pageRequest = pageRequest;
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
            await this.loadScheduledTransactions(wallet,true,this.pageRequest,this.search);
        },
        async delete(wallet: WalletDto,scheduled: ScheduledTransactionDto){
            await axios.delete("/api/scheduled/",{
                data:{
                    wallet,
                    scheduledTransaction: scheduled
                }
            });
            await this.loadScheduledTransactions(wallet,true,this.pageRequest,this.search);
        },
        async pageChange(page: number){
            await this.loadScheduledTransactions(this.wallet!,true,{...this.pageRequest,page},undefined);
        }
    }
});