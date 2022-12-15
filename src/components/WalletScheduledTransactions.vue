<script setup lang="ts">
import { ref } from 'vue';
import ScheduledTransactionDto from '../models/ScheduledTransactionDto';
import WalletDto from '../models/WalletDto';
import { useCategoryStore } from '../stores/category';
import { Search, useScheduledTransactionsStore } from '../stores/scheduledTransactions';
import { initialPageRequest } from '../stores/transactions';
import ScheduledTransactionList from './ScheduledTransactionList.vue';
const props = defineProps<{
    wallet: WalletDto
}>();

const scheduledTransactionStore = useScheduledTransactionsStore();
scheduledTransactionStore.loadScheduledTransactions(props.wallet,false);
 
const categoryStore = useCategoryStore();
categoryStore.loadCategories(false);
const search = ref(<Search>{});

function deleteScheduledTransaction(transaction: ScheduledTransactionDto){
    scheduledTransactionStore.delete(props.wallet,transaction);
}

function doSearch(){
    scheduledTransactionStore.loadScheduledTransactions(props.wallet,false,initialPageRequest,search.value);
}
</script>
<template>
<div class="card transaction-card">
    <div class="card-header">
        <h5>{{$t('scheduledTransactions')}}</h5> 
    </div>
    <div class="card-body">
        <div class="accordion" id="transactionFilters">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#transactionFiltersCollapse">
                        {{$t('search')}}
                    </button>
                </h2>
                <div id="transactionFiltersCollapse" class="accordion-collapse collapse" data-bs-parent="#transactionFilters">
                    <div class="accordion-body">
                        <div class="container">
                            <div class="row">
                                <span>Start date</span><date-picker class='form-control' v-model="search.startDate"  :enable-time-picker="false"></date-picker>
                                <span>End date</span><date-picker class='form-control' v-model="search.endDate"  :enable-time-picker="false"></date-picker>
                            </div>
                            <div class="row">
                                <span>Name</span><input class='form-control' v-model="search.name"/>
                                <span>Category</span><v-select class="form-control" :options="categoryStore.categories" v-model="search.category"  label='name'/>
                            </div>
                            <div class="row mt-3">
                                <button class="btn btn-outline-success" @click="doSearch">{{$t('search')}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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