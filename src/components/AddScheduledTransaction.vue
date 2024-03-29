<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '../stores/category';
import { useWalletsStore } from '../stores/wallets';
import router from '../router'
import BackButton from './BackButton.vue';
import { useScheduledTransactionsStore } from '../stores/scheduledTransactions';
import ScheduledTransactionDto from '../models/ScheduledTransactionDto';
import {RecurrentType} from '../models/ScheduledTransactionDto';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';


const route = useRoute();
const i18n = useI18n();
const walletId = Number.parseInt(<string>route.params.walletId);
const transactionId = Number.parseInt(<string>route.params.transactionId);
const walletStore = useWalletsStore();
const scheduledTransactionStore = useScheduledTransactionsStore();
const wallet = walletStore.wallet(walletId);
const categoryStore = useCategoryStore();
categoryStore.loadCategories(false);
const {categories} = storeToRefs(categoryStore);
const transaction = ref(scheduledTransactionStore.transaction(transactionId,wallet) ?? <ScheduledTransactionDto>{});
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
    scheduledTransactionStore.save(wallet,transaction.value);
    router.push("/wallets");
}
function canEdit(){
    return transaction.value.id != undefined
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
            <date-picker  id="date" required v-model="transaction.date"  :enable-time-picker="false" />
        </div>
        <div class="mb-3">
            <label class="form-label" label-for="endDate">{{$t('endDate')}}</label>
            <date-picker  id="endDate" v-model="transaction.endDate"  :enable-time-picker="false" />
        </div>
        <div class="mb-3">
            <label class="form-label" label-for="amount">{{$t('amount')}}</label>
            <input class="form-control" type="number" step="0.01" id="amount" v-model="transaction.amount"  required/>
        </div>
        <div class="mb-3 form-check">
            <label class="form-check-label" label-for="recurrent">{{$t('recurrent')}}</label>
            <input class="form-check-input" type="checkbox" id="recurrent" v-model="transaction.recurrent"  />
        </div>
        <div class="mb-3"  v-if="transaction.recurrent">
            <label class="form-label" label-for="type">{{$t('type')}}</label>
            <v-select class="form-control" :options="['MONTHLY','WEEKLY']" v-model="transaction.type" label='type'/>
        </div>
        <div class="mb-3" v-if="transaction.recurrent && transaction.type == 'MONTHLY'">
            <label class="form-label" label-for="dayOfMonth">{{$t('dayOfMonth')}}</label>
            <input class="form-control" type="number" id="dayOfMonth" required v-model="transaction.dayOfMonth" />
        </div>
        <div class="mb-3" v-if="transaction.recurrent && transaction.type == 'WEEKLY'">
            <label class="form-label" label-for="dayOfWeek">{{$t('dayOfWeek')}}</label>
            <input class="form-control" type="number" id="dayOfWeek" required v-model="transaction.dayOfWeek" />
        </div>
        <div class="mb-3" v-if="transaction.recurrent">
            <label class="form-label" label-for="recurrentFrequency">{{$t('recurrentFrequency')}}</label>
            <input class="form-control" id="recurrentFrequency" type="number" v-model="transaction.recurrentFrequency"  />
        </div>
        <div class="mb-3">
            <label class="form-label" label-for="category">{{$t('category')}}</label>
            <v-select class="form-control" :options="categoryStore.categories" v-model="transaction.categoryDto" label='name'/>
        </div>
        <button class="btn btn-outline-success">{{$t('save')}}</button>
    </form>
    <BackButton back="/wallets"/>
</div>
</template>