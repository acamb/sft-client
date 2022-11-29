<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import WalletDto from '../models/WalletDto';
import { useTransactionsStore } from '../stores/scheduledTransactions';
import { useWalletsStore } from '../stores/wallets';
import BackButton from './BackButton.vue';
import TransactionList from './TransactionList.vue';
const route = useRoute();
const walletId = <number><unknown> route.params.id
const walletStore = useWalletsStore();
const wallet: WalletDto = walletStore.wallet(walletId);
const transactionStore = useTransactionsStore();
</script>
<template>
    {{wallet}}
    //TODO buttons and info
    <TransactionList :transactions="transactionStore.transactions(wallet)"></TransactionList>
    <BackButton/>
</template>