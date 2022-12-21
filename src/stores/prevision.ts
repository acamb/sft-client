import { WalletPrevision } from './../models/WalletPrevision';

import { defineStore } from 'pinia';
import WalletDto from '../models/WalletDto';
import axios from "../axios"

export type PrevisionState = {
    prevision:Map<string,number>,
    estimated:Map<string,number>,
    endBalanceEstimated: number
}

export interface Search{
    startDate: Date,
    endDate: Date
}

export const usePrevisionStore = defineStore('prevision',{
    state: () => ({
        prevision: new Map(),
        estimated: new Map(),
        endBalanceEstimated: 0
    }) as PrevisionState,
    actions: {
        async loadStatistics(wallet: WalletDto,search: Search){
            let response = await axios.get<WalletPrevision>(`api/statistics/prevision/${wallet.id}?startDate=${search.startDate.toISOString()}&endDate=${search.endDate.toISOString()}`);
            this.prevision = new Map(Object.entries(response.data.prevision)) || new Map();
            this.estimated = new Map(Object.entries(response.data.estimated)) || new Map();
            this.endBalanceEstimated = response.data.endBalanceEstimated || 0;
        }   
    }
});