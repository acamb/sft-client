<script setup lang="ts">
import TransactionDto from '../models/TransactionDto';
import WalletDto from '../models/WalletDto';
import {formatDate} from '../DateUtils'
import Paginator from './Paginator.vue';
import { number } from '@intlify/core-base';
const props = defineProps({
    transactions: {type: Array<TransactionDto>,required: true},
        walletId: {type: Number, required: true},
        page: {type: Number,required: true},
        pages:{type: Number,required: true}
});

const emit = defineEmits<{
  (e: 'delete-transaction', transaction: TransactionDto): void,
  (e: 'page-change', index: number): void
}>();

</script>
<template>
<div class="container">
    <table class="table table-striped table-responsive  table-sm">
        <thead>
            <th>{{$t('date')}}</th>
            <th>{{$t('category')}}</th>
            <th>{{$t('amount')}}</th>
            <th></th>
        </thead>
        <tbody>
            <tr v-for="transaction in props.transactions">
                <td>{{formatDate(transaction.date)}}</td>
                <td>{{transaction.categoryDto?.name}}</td>
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
                    
                    <button class="btn btn-outline-danger" @click="$emit('delete-transaction',transaction)"><i class="bi bi-x-circle"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
    <Paginator :page="props.page" :total-pages="props.pages" @change="(i)=>$emit('page-change',i)"/>
</div>
</template>