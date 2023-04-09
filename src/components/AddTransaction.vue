<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import TransactionDto from '../models/TransactionDto';
import { useCategoryStore } from '../stores/category';
import {transactionType, useTransactionsStore} from '../stores/transactions';
import { useWalletsStore } from '../stores/wallets';
import router from '../router'
import BackButton from './BackButton.vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import CryptoTransactionDto from "../models/CryptoTransactionDto";

const route = useRoute();
const i18n = useI18n();
const walletId = Number.parseInt(<string>route.params.walletId);
const transactionId = Number.parseInt(<string>route.params.transactionId);
const walletStore = useWalletsStore();
const transactionStore = useTransactionsStore();
const wallet = walletStore.wallet(walletId);
const categoryStore = useCategoryStore();
categoryStore.loadCategories(false);
const {categories} = storeToRefs(categoryStore);
const _trx = transactionStore.transaction(transactionId,wallet) ?? <TransactionDto>{};
if(wallet.walletType === 'CRYPTO' && _trx.cryptoTransactionDto === undefined){
  _trx.cryptoTransactionDto = <CryptoTransactionDto>{};
}
const transaction = ref(_trx);
const error = ref('');
function save(){
    if(transaction.value.categoryDto){
        if(!transaction.value.categoryDto.canBeNegative && transaction.value.amount! < 0){
            error.value = i18n.t('amountCantBeNegative');
            return;
        }
        if(!transaction.value.categoryDto.canBePositive && transaction.value.amount! > 0){
            error.value = i18n.t('amountCantBePositive');
            return;
        }
    }
    if(wallet.walletType === 'CRYPTO'){
      if(transaction.value.cryptoTransactionDto?.transactionType === 'SELL' && transaction.value.amount! > 0){
        error.value = i18n.t('amountCantBePositive');
        return;
      }
      if(transaction.value.cryptoTransactionDto?.transactionType === 'BUY' && transaction.value.amount! < 0){
        error.value = i18n.t('amountCantBeNegative');
        return;
      }
    }
    transactionStore.save(wallet,transaction.value);
  router.push(wallet.walletType === 'FIAT' ? "/wallets" : "/cryptowallets");
}
function canEdit(){
    return transaction.value.id == undefined
}
</script>
<template>
<div class="container">
    <div v-if="error" class="alert alert-danger">{{error}}</div>
    <form @submit.prevent="()=>save()">
        <div class="mb-3">
            <label class="form-label" label-for="name">{{$t('name')}}</label>
            <input class="form-control" type="name" id="name" required v-model="transaction.name" />
        </div>
        <div class="mb-3">
            <label class="form-label" label-for="date">{{$t('date')}}</label>
            <date-picker  id="date" required v-model="transaction.date"  :enable-time-picker="false" :disabled="!canEdit()"/>
        </div>
        <div class="mb-3">
            <label class="form-label" label-for="amount">{{$t('amount')}}</label>
            <input class="form-control" type="number" step="0.0000000001" id="amount" v-model="transaction.amount"  :disabled="!canEdit()"/>
        </div>
        <div class="mb-3"  v-if="wallet.walletType === 'FIAT'">
            <label class="form-label" label-for="category">{{$t('category')}}</label>
            <v-select class="form-control" :options="categoryStore.categories" v-model="transaction.categoryDto" label='name'/>
        </div>
        <div class="mb-3">
            <label class="form-label" label-for="note">{{$t('note')}}</label>
            <input class="form-control" id="note" v-model="transaction.note"/>
        </div>
        <div class="mb-3"  v-if="wallet.walletType === 'FIAT'">
            <label class="form-check-label" label-for="scheduled">{{$t('scheduled')}}</label>
            <input class="form-check-input" id="scheduled" type="checkbox" v-model="transaction.scheduled"/>
        </div>
        <template  v-if="wallet.walletType === 'CRYPTO'">
          <div class="mb-3">
            <label class="form-label" label-for="baseValue">{{$t('baseValue')}}</label>
            <input class="form-control" type="number" step="0.01" id="baseValue" v-model="transaction.cryptoTransactionDto.price"/>
          </div>
          <div class="mb-3">
            <label class="form-label" label-for="fee">{{$t('fee')}}</label>
            <input class="form-control" type="number" step="0.000001" id="fee" v-model="transaction.cryptoTransactionDto.fee"/>
          </div>
          <div class="mb-3">
            <label class="form-label" label-for="category">{{$t('transactionType')}}</label>
            <v-select class="form-control" :options="['BUY','SELL','TRANSFER']" v-model="transaction.cryptoTransactionDto.transactionType" label='name'/>
          </div>
          <button class="btn btn-outline-success">{{$t('save')}}</button>
        </template>
    </form>
    <BackButton :back="wallet.walletType === 'FIAT' ? '/wallets' : '/cryptowallets' "/>
</div>
</template>