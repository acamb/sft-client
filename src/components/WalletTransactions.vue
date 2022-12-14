<script setup lang="ts">
import TransactionDto from '../models/TransactionDto';
import WalletDto from '../models/WalletDto';
import { useTransactionsStore } from '../stores/transactions';
import TransactionList from './TransactionList.vue';
const props = defineProps<{
    wallet: WalletDto
}>();
const transactionStore = useTransactionsStore();
transactionStore.loadTransactions(props.wallet,false);

function deleteTransaction(transaction: TransactionDto){
    transactionStore.delete(props.wallet,transaction);
}

</script>
<template>
<div class="card transaction-card">
    <div class="card-header">
        <h5>{{$t('transactions')}}</h5> 
    </div>
    <div class="card-body">
<!--TODO: filters-->
        <TransactionList 
            :wallet-id="props.wallet.id!" 
            :transactions="transactionStore.transactions" 
            :page="transactionStore.page" 
            :pages="transactionStore.totalPages" 
            @delete-transaction="deleteTransaction"
            @page-change="(i: number)=>transactionStore.pageChange(i)"></TransactionList>
    </div>
</div>
</template>
<style>
.transaction-card{
    margin-top: 40px;
}
</style>