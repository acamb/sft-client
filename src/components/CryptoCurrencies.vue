<script setup lang="ts">
import CategoryDto from '../models/CategoryDto';
import { useCategoryStore } from '../stores/category';
import router from '../router';
import BackButton from './BackButton.vue';
import {useCryptoCurrencyStore} from "../stores/cryptoCurrency";
import CryptoCurrency from "../models/CryptoCurrency";
const cryptoCurrencyStore = useCryptoCurrencyStore();

function deleteCryptoCurrency(currency: CryptoCurrency){
    cryptoCurrencyStore.delete(currency);
}

function editCryptoCurrency(currency: CryptoCurrency | undefined){
    if(currency?.id){
        router.push({path: `/editCurrency/${currency.id}`,});
    }
    else{
        router.push('/addCurrency');
    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <button class="btn btn-outline-success w-auto" @click="editCryptoCurrency(undefined)">{{ $t('addCurrency')}}</button>
        </div>
        <div class=" category-container flex-column row ">
            <div class="d-flex justify-content-between cat-box " v-for="c in cryptoCurrencyStore.currencies">
                <div>{{ c.name }}</div>
                <div>
                    <button class="btn btn-outline-primary" @click="editCryptoCurrency(c)"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-outline-danger" @click="deleteCryptoCurrency(c)"><i class="bi bi-x-circle"></i></button>
                </div>
            </div>
        </div>
        <div class="row">
            <BackButton class="w-auto" :back="'/'"/>
        </div>
    </div>
</template>
<style>
.cat-box:hover{
    background-color: rgb(221, 221, 221);
}
</style>