import { defineStore } from 'pinia';
import CategoryDto from './../models/CategoryDto';
import axios from '../axios';
import CryptoCurrency from "../models/CryptoCurrency";

export type CryptoCurrencyState = {
    currencies: CryptoCurrency[]
}

export const useCryptoCurrencyStore = defineStore('currencies',{
    state: () => ({
        currencies: []
    }) as CryptoCurrencyState,
    getters: {
        currency(state){
            return (id:number): CryptoCurrency | undefined => this.currencies.find(c => c.id === id);
        }
    },
    actions: {
        async load(force: boolean){
            if(this.currencies.length == 0 || force ){
                let response = await axios.get<Array<CryptoCurrency>>("/api/cryptocurrency/all");
                this.currencies = response.data ?? [];
            }
        },
        async save(currency: CryptoCurrency){
            if(currency.id){
                await axios.put("/api/cryptocurrency/",currency);
            }
            else{
                await axios.post("/api/cryptocurrency/",currency);
            }
            await this.load(true);
        },
        async delete(currency: CryptoCurrency){
            await axios.delete(`/api/cryptocurrency/${currency.id}`);
            await this.load(true);
        }
    }
})