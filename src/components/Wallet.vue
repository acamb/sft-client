<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import TransactionDto from '../models/TransactionDto';
import WalletDto from '../models/WalletDto';
import { useTransactionsStore } from '../stores/transactions';
import { useWalletsStore } from '../stores/wallets';
import BackButton from './BackButton.vue';
import TransactionList from './TransactionList.vue';
const route = useRoute();
const walletId = <number><unknown> route.params.id
const walletStore = useWalletsStore();
const wallet: WalletDto = walletStore.wallet(walletId);
const transactionStore = useTransactionsStore();

function deleteTransaction(transaction: TransactionDto){
    transactionStore.delete(wallet,transaction);
}
</script>
<template>
    {{wallet}}
    //TODO buttons and info
    //scheduled transactions
    //add transaction
    <TransactionList :transactions="transactionStore.transactions(wallet)" @delete-transaction="deleteTransaction"></TransactionList>
    <BackButton/>
</template>