import { WalletStatistics } from './../models/WalletStatistics';
import { defineStore } from 'pinia';
import WalletDto from '../models/WalletDto';
import axios from "../axios"

export type StatisticsState = {
    statistics:WalletStatistics
}

export interface Search{
    startDate: Date,
    endDate: Date
}

export const useStatisticsStore = defineStore('statistics',{
    state: () => ({
        statistics: {}
    }) as StatisticsState,
    actions: {
        async loadStatistics(wallet: WalletDto,search: Search){
            let response = await axios.get<WalletStatistics>(`api/statistics/${wallet.id}?startDate=${search.startDate.toISOString()}&endDate=${search.endDate.toISOString()}`);
            this.statistics = response.data || {};
        }   
    }
});