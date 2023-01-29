<script setup lang="ts">
import CategoryDto from '../models/CategoryDto';
import {ref} from 'vue';
import router from '../router'
import BackButton from './BackButton.vue';
import {useRoute} from 'vue-router';
import {useCryptoCurrencyStore} from "../stores/cryptoCurrency";
import CryptoCurrency from "../models/CryptoCurrency";

const cryptoCurrencyStore = useCryptoCurrencyStore();
const route = useRoute();
const currency = ref(cryptoCurrencyStore.currency(Number.parseInt(<string>route.params.id)) ?? <CryptoCurrency>{name: '',ticker: ''});


function submit(){
    cryptoCurrencyStore.save(currency.value!);
    router.push('/currencies');
}
</script>
<template>
<div class="container">
    <form @submit.prevent="()=>submit()">
        <div class="mb-3">
            <label class="form-label" label-for="name">{{$t('name')}}</label>
            <input class="form-control" id="name" required v-model="currency.name"/>
        </div>
        <div class="mb-3">
            <label class="form-label" label-for="description">{{$t('ticker')}}</label>
            <input class="form-control" id="description" v-model="currency.ticker"/>
        </div>
        <button class="btn btn-outline-success">{{$t('save')}}</button>
        <BackButton back="/"/>
    </form>
</div>
</template>