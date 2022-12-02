<script setup lang="ts">
import ScheduledTransactionDto from '../models/ScheduledTransactionDto';
import {formatDate} from '../DateUtils'
const props = defineProps({
    scheduledTransactions: {type: Array<ScheduledTransactionDto>,required: true},
    walletId: {type: Number, required: true}
});

const emit = defineEmits<{
  (e: 'delete-scheduled-transaction', transaction: ScheduledTransactionDto): void
}>();

</script>
<template>
<div class="container">
    <table class="table table-striped table-responsive table-sm">
        <thead>
            <th>{{$t('date')}}</th>
            <th>{{$t('name')}}</th>
            <th>{{$t('amount')}}</th>
            <th>{{$t('nextFire')}}</th>
            <th></th>
        </thead>
        <tbody>
            <tr v-for="transaction in props.scheduledTransactions">
                <td>{{formatDate(transaction.date)}}</td>
                <td>{{transaction.name}}</td>
                <td>{{transaction.amount}}</td>
                <td>{{formatDate(transaction.nextFire)}}</td>
                <td>
                    <router-link
                    :to="{
                        name: 'editScheduledTransaction',
                        params: {walletId,transactionId: transaction.id},
                    }"
                    custom
                    v-slot="{ navigate }"
                    >
                    <button class="btn btn-outline-primary" @click="navigate"><i class="bi bi-pencil-square"></i></button>
                </router-link>
                    
                    <button class="btn btn-outline-danger" @click="$emit('delete-scheduled-transaction',transaction)"><i class="bi bi-x-circle"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>