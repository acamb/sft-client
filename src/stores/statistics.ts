import { WalletStatistics } from './../models/WalletStatistics';
import { defineStore } from 'pinia';
import WalletDto from '../models/WalletDto';
import axios from "../axios"

export type StatisticsState = {
    expenses: number;
    incomes: number;
    expensesByCategory:Map<string,number>;
}

export interface Search{
    startDate: Date,
    endDate: Date
}

export const useStatisticsStore = defineStore('statistics',{
    state: () => ({
        expenses: 0,
        incomes: 0,
    expensesByCategory:new Map()
    }) as StatisticsState,
    actions: {
        async loadStatistics(wallet: WalletDto,search: Search){
            let response = await axios.get<WalletStatistics>(`api/statistics/${wallet.id}?startDate=${search.startDate.toISOString()}&endDate=${search.endDate.toISOString()}`);
            this.expenses = response.data.expenses || 0;
            this.incomes = response.data.incomes || 0
            this.expensesByCategory = new Map(Object.entries(response.data.expensesByCategory)) || new Map();
        }   
    }
});