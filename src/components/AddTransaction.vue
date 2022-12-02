<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import TransactionDto from '../models/TransactionDto';
import { useCategoryStore } from '../stores/category';
import { useTransactionsStore } from '../stores/transactions';
import { useWalletsStore } from '../stores/wallets';
import router from '../router'
import BackButton from './BackButton.vue';
import { storeToRefs } from 'pinia';

const route = useRoute();

const walletId = Number.parseInt(<string>route.params.walletId);
const transactionId = Number.parseInt(<string>route.params.transactionId);
const walletStore = useWalletsStore();
const transactionStore = useTransactionsStore();
const wallet = walletStore.wallet(walletId);
const categoryStore = useCategoryStore();
categoryStore.loadCategories(false);
const {categories} = storeToRefs(categoryStore);
const transaction = ref(transactionStore.transaction(transactionId,wallet) ?? <TransactionDto>{});
function save(){
    transactionStore.save(wallet,transaction.value);
    router.push("/wallets");
}
function canEdit(){
    console.log(`canEdit: ${transaction.value.id == undefined}, id: ${transaction.value.id}`)
    return transaction.value.id == undefined
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
        <date-picker  id="date" required v-model="transaction.date"  :enable-time-picker="false" :disabled="!canEdit()"/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="amount">{{$t('amount')}}</label>
        <input class="form-control" id="amount" v-model="transaction.amount"  :disabled="!canEdit()"/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="category">{{$t('category')}}</label>
        <v-select class="form-control" :options="categoryStore.categories" v-model="transaction.categoryDto" label='name'/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="note">{{$t('note')}}</label>
        <input class="form-control" id="note" v-model="transaction.note"/>
    </div>
    <button class="btn btn-outline-success">{{$t('save')}}</button>
    
</form>
<BackButton back="/wallets"/>
</template>