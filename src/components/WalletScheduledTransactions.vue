<script setup lang="ts">
import ScheduledTransactionDto from '../models/ScheduledTransactionDto';
import WalletDto from '../models/WalletDto';
import { useScheduledTransactionsStore } from '../stores/scheduledTransactions';
import ScheduledTransactionList from './ScheduledTransactionList.vue';
const props = defineProps<{
    wallet: WalletDto
}>();

const scheduledTransactionStore = useScheduledTransactionsStore();
scheduledTransactionStore.loadScheduledTransactions(props.wallet,false);
 

function deleteScheduledTransaction(transaction: ScheduledTransactionDto){
    scheduledTransactionStore.delete(props.wallet,transaction);
}
</script>
<template>
<div class="card transaction-card">
    <div class="card-header">
        <h5>{{$t('scheduledTransactions')}}</h5> 
    </div>
    <div class="card-body">
            <!--TODO: filters-->
        <ScheduledTransactionList
            :wallet-id="props.wallet.id!" 
            :scheduledTransactions="scheduledTransactionStore.transactions" 
            :page="scheduledTransactionStore.page" 
            :pages="scheduledTransactionStore.totalPages" 
            @delete-scheduled-transaction="deleteScheduledTransaction"
            @page-change="(i: number)=>scheduledTransactionStore.pageChange(i)"
            ></ScheduledTransactionList>
    </div>
</div>
</template>
<style>
.transaction-card{
    margin-top: 40px;
}
</style>