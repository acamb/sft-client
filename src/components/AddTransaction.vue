<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import TransactionDto from '../models/TransactionDto';
import { useCategoryStore } from '../stores/category';
import { useTransactionsStore } from '../stores/transactions';
import { useWalletsStore } from '../stores/wallets';
import router from '../router'
import BackButton from './BackButton.vue';

const route = useRoute();
const props = defineProps({
    walletId: number,
    transactionId: number
});
const walletStore = useWalletsStore();
const transactionStore = useTransactionsStore();
const wallet = walletStore.wallet(walletId);
const categoryStore = useCategoryStore();
categoryStore.loadCategories(false);
const transaction = ref(transactionStore.transaction(transactionId,wallet) ?? <TransactionDto>{});
function save(){
    transactionStore.save(wallet,transaction.value);
    router.push("/wallets");
}
</script>
<template>
<form @submit.prevent="save">
    <div class="mb-3">
        <label class="form-label" label-for="date">{{$t('date')}}</label>
        <input class="form-input" id="date" required v-model="transaction.date" disabled/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="amount">{{$t('amount')}}</label>
        <input class="form-input" id="amount" v-model="transaction.amount" disabled/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="previousAmount">{{$t('previousAmount')}}</label>
        <input class="form-input" id="previousAmount" v-model="transaction.previousAmount" disabled/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="category">{{$t('category')}}</label>
        <v-select :options="categoryStore.categories" v-model="transaction.categoryDto"/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="note">{{$t('note')}}</label>
        <input class="form-input" id="note" required v-model="transaction.note"/>
    </div>
    <button class="btn btn-outline-success">{{$t('save')}}</button>
    <BackButton/>
</form>
</template>