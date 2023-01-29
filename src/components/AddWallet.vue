<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import WalletDto, {WalletType} from '../models/WalletDto';
import router from '../router';
import { useWalletsStore } from '../stores/wallets';
import BackButton from './BackButton.vue';
import {useCryptoCurrencyStore} from "../stores/cryptoCurrency";
import {storeToRefs} from "pinia";

const route = useRoute();
const walletStore = useWalletsStore();
const currencyStore = useCryptoCurrencyStore();

const wallet = ref(walletStore.wallet(Number.parseInt(<string>route.params.id)) ?? <WalletDto>{});
const {currencies} = storeToRefs(currencyStore);
function submit(){
    console.log(`name: ${wallet.value.name}`)
    walletStore.save({...wallet.value});
    router.push(wallet.value.walletType === 'FIAT' ? "/wallets" : "/cryptowallets");
}
</script>
<template>
<form @submit.prevent="submit">
    <div class="mb-3">
        <label class="form-label" label-for="name">{{$t('name')}}</label>
        <input class="form-control" id="name" required v-model="wallet.name"/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="description">{{$t('description')}}</label>
        <input class="form-control" id="description" v-model="wallet.description" required/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="balance">{{$t('balance')}}</label>
        <input type="number" class="form-control" id="balance" v-model="wallet.balance" required/>
    </div>
    <div class="mb-3">
      <label class="form-label" label-for="balance">{{$t('walletType')}}</label>
      <v-select class="form-control" :options="['FIAT','CRYPTO']" v-model="wallet.walletType" label='walletType'/>
    </div>
    <div class="mb-3" v-if="wallet.walletType === 'CRYPTO'">
      <label class="form-label" label-for="currency">{{$t('currency')}}</label>
      <v-select class="form-control" :options="currencies" name="currency" v-model="wallet.currency" label='name' required/>
    </div>
    <button class="btn btn-outline-success">{{$t('save')}}</button>
    <BackButton back="/"/>
</form>
</template>