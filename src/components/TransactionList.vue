<script setup lang="ts">
import TransactionDto from '../models/TransactionDto';
import WalletDto from '../models/WalletDto';
import {formatDate} from '../DateUtils'
import Paginator from './Paginator.vue';
import { number } from '@intlify/core-base';
import { ref } from 'vue';
const props = defineProps({
    transactions: {type: Array<TransactionDto>,required: true},
        walletId: {type: Number, required: true},
        page: {type: Number,required: true},
        pages:{type: Number,required: true}
});
const emit = defineEmits<{
  (e: 'transaction-delete-transaction', transaction: TransactionDto): void,
  (e: 'transaction-page-change', index: number): void
}>();

</script>
<template>
<div class="container">
    <table class="table table-striped table-responsive  table-sm">
        <thead>
            <th>{{$t('date')}}</th>
            <th>{{$t('name')}}</th>
            <th>{{$t('amount')}}</th>
            <th></th>
        </thead>
        <tbody>
            <tr v-for="transaction in props.transactions">
                <td>{{formatDate(transaction.date)}}</td>
                <td>{{transaction.name}}</td>
                <td>{{transaction.amount}}</td>
                <td>
                     <router-link
                    :to="{
                        name: 'editTransaction',
                        params: {walletId,transactionId: transaction.id},
                    }"
                    custom
                    v-slot="{ navigate }"
                    >
                    <button class="btn btn-outline-primary" @click="navigate"><i class="bi bi-pencil-square"></i></button>
                </router-link> 
                    
                    <button class="btn btn-outline-danger" @click="$emit('transaction-delete-transaction',transaction)"><i class="bi bi-x-circle"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
    <Paginator :page="props.page" :total-pages="props.pages" @change="(i)=>$emit('transaction-page-change',i)"/>
</div>
</template>