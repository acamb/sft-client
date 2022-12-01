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

const route = useRoute();

const walletId = Number.parseInt(<string>route.params.walletId);
const transactionId = Number.parseInt(<string>route.params.transactionId);
const walletStore = useWalletsStore();
const scheduledTransactionStore = useScheduledTransactionsStore();
const wallet = walletStore.wallet(walletId);
const categoryStore = useCategoryStore();
categoryStore.loadCategories(false);
const transaction = ref(scheduledTransactionStore.transaction(transactionId,wallet) ?? <ScheduledTransactionDto>{});
function save(){
    scheduledTransactionStore.save(wallet,transaction.value);
    router.push("/wallets");
}
function canEdit(){
    return transaction.value.id != undefined
}
</script>
<template>
<form @submit.prevent="save">
    <div class="mb-3">
        <label class="form-label" label-for="name">{{$t('name')}}</label>
        <input class="form-control" type="name" id="name" required v-model="transaction.name" />
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="date">{{$t('date')}}</label>
        <input class="form-control" type="date" id="date" required v-model="transaction.date" />
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="endDate">{{$t('endDate')}}</label>
        <input class="form-control" type="endDate" id="endDate" v-model="transaction.endDate" />
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="amount">{{$t('amount')}}</label>
        <input class="form-control" id="amount" v-model="transaction.amount"  required/>
    </div>
    <div class="mb-3 form-check">
        <label class="form-check-label" label-for="recurrent">{{$t('recurrent')}}</label>
        <input class="form-check-input" type="checkbox" id="recurrent" v-model="transaction.recurrent"  />
    </div>
    <div class="mb-3" v-if="transaction.recurrent">
        <label class="form-label" label-for="recurrentFrequency">{{$t('recurrentFrequency')}}</label>
        <input class="form-control" id="recurrentFrequency" type="number" v-model="transaction.recurrentFrequency"  />
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="type">{{$t('type')}}</label>
        <v-select class="form-control" :options="['MONTHLY','WEEKLY']" v-model="transaction.type" label='type'/>
    </div>
    <div class="mb-3" v-if="transaction.type == 'MONTHLY'">
        <label class="form-label" label-for="dayOfMonth">{{$t('dayOfMonth')}}</label>
        <input class="form-control" type="number" id="dayOfMonth" required v-model="transaction.dayOfMonth" />
    </div>
    <div class="mb-3" v-if="transaction.type == 'WEEKLY'">
        <label class="form-label" label-for="dayOfWeek">{{$t('dayOfWeek')}}</label>
        <input class="form-control" type="number" id="dayOfWeek" required v-model="transaction.dayOfWeek" />
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="category">{{$t('category')}}</label>
        <v-select class="form-control" :options="categoryStore.categories" v-model="transaction.categoryDto" label='name'/>
    </div>
    <button class="btn btn-outline-success">{{$t('save')}}</button>
</form>
<BackButton/>
</template>