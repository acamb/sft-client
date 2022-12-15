import { PageRequest } from './PageRequest';
import { PaginatedResponse } from './PaginatedResponse';
import { useWalletsStore } from './wallets';
import CategoryDto from './../models/TransactionDto.d';
import { defineStore } from 'pinia';
import TransactionDto from "../models/TransactionDto"
import WalletDto from "../models/WalletDto"
import axios from "../axios"

export type TransactionsState = {
    transactions: TransactionDto[],
    search?: Search,
    page: number,
    max: number,
    totalPages: number,
    totalElements: number,
    wallet?: WalletDto,
    pageRequest: PageRequest

}

export enum transactionType{
    INCOME = 'INCOME',
    OUTCOME = 'OUTCOME'
}

export type Search = {
    startDate?: Date,
    endDate?: Date,
    category?: CategoryDto,
    type?: transactionType,
    name?: string
}

export const initialPageRequest = {page:0,size:10};

export const useTransactionsStore = defineStore('transactions',{
    state: () => ({
        transactions: [],
        search: undefined,
        page: 0,
        max: 10,
        totalElements: 0,
        totalPages: 0,
        wallet: undefined,
        pageRequest: initialPageRequest
    }) as TransactionsState,
    getters: {
        transaction(state: TransactionsState){
            return (id: number,wallet: WalletDto) : TransactionDto | undefined => {
                if(id && wallet != state.wallet){
                    throw new Error('not loaded?');
                }
                return state.transactions?.find(t => t.id === id);
            }
        }
    },
    actions: {
        async loadTransactions(wallet: WalletDto,force: boolean,page?: PageRequest,search?: Search){
            if(force || search != this.search || page != this.pageRequest || this.transactions.length == 0){
                let pageRequest = page ?? this.pageRequest;
                this.search = search ?? this.search;
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
                if(this.search?.type){
                    query += `&type=${transactionType[this.search.type]}`
                }
                let response = await axios.get<PaginatedResponse<TransactionDto>>(`api/transaction/${wallet.id}?${query}`);
                this.transactions = response.data.items || [];
                this.totalElements = response.data.totalItems;
                this.totalPages = response.data.totalPages;
                this.page = response.data.currentPage;
                this.wallet = wallet;
                this.pageRequest = pageRequest;
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
            await this.loadTransactions(wallet,true,this.pageRequest,undefined);
        },
        async delete(wallet: WalletDto,transaction: TransactionDto){
            const walletsStore = useWalletsStore();
            await axios.delete(`api/transaction/`,{data:{walletDto:wallet,transactionDto:transaction}});
            await walletsStore.refreshWallet(wallet);
            await this.loadTransactions(wallet,true,this.pageRequest,undefined);
        },
        async pageChange(page: number){
            await this.loadTransactions(this.wallet!,true,{...this.pageRequest,page},undefined);
        }
    }
});