<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import ScheduledTransactionDto from '../models/ScheduledTransactionDto';
import TransactionDto from '../models/TransactionDto';
import WalletDto from '../models/WalletDto';
import { useScheduledTransactionsStore } from '../stores/scheduledTransactions';
import { useTransactionsStore } from '../stores/transactions';
import { useWalletsStore } from '../stores/wallets';
import BackButton from './BackButton.vue';
import ScheduledTransactionList from './ScheduledTransactionList.vue';
import TransactionList from './TransactionList.vue';
import {ref} from 'vue';

const route = useRoute();
const walletId = Number.parseInt(<string>route.params.id);
const walletStore = useWalletsStore();
const wallet = ref(walletStore.wallet(walletId));
const transactionStore = useTransactionsStore();
transactionStore.loadTransactions(wallet.value,false);
const scheduledTransactionStore = useScheduledTransactionsStore();
scheduledTransactionStore.loadScheduledTransactions(wallet.value,false);
 
function deleteTransaction(transaction: TransactionDto){
    transactionStore.delete(wallet.value,transaction);
}
function deleteScheduledTransaction(transaction: ScheduledTransactionDto){
    scheduledTransactionStore.delete(wallet.value,transaction);
}
</script>
<template>
    <div>
        <router-link
                    :to="{
                        name: 'addTransaction',
                        params: {walletId: wallet.id}
                    }"
                    custom
                    v-slot="{ navigate }"
                    >
                    <button class="btn btn-outline-success" @click="navigate">Add transaction</button>
        </router-link>
        <router-link
                    :to="{
                        name: 'addScheduledTransaction',
                        params: {walletId: wallet.id}
                    }"
                    custom
                    v-slot="{ navigate }"
                    >
                    <button class="btn btn-outline-success" @click="navigate">Add scheduled transaction</button>
        </router-link>
    </div>
    <div>
        {{$t('transactions')}} //TODO search
        <TransactionList :wallet-id="walletId" :transactions="transactionStore.transactions(wallet)" @delete-transaction="deleteTransaction"></TransactionList>
    </div>

    <div>
        {{$t('scheduledTransactions')}}
        <ScheduledTransactionList :wallet-id="walletId" :scheduledTransactions="scheduledTransactionStore.transactions(wallet)" @delete-scheduled-transaction="deleteScheduledTransaction"></ScheduledTransactionList>
    </div>
    <BackButton/>
</template>