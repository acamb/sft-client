<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import TransactionDto from '../models/TransactionDto';
import WalletDto from '../models/WalletDto';
import { useCategoryStore } from '../stores/category';
import { Search, transactionType, useTransactionsStore,initialPageRequest } from '../stores/transactions';
import TransactionList from './TransactionList.vue';
const props = defineProps<{
    wallet: WalletDto
}>();
const transactionStore = useTransactionsStore();
transactionStore.loadTransactions(props.wallet,false);

const types = [transactionType.INCOME,transactionType.OUTCOME];

const categoryStore = useCategoryStore();
categoryStore.loadCategories(false);
const search = ref(<Search>{});

function deleteTransaction(transaction: TransactionDto){
    transactionStore.delete(props.wallet,transaction);
}

function doSearch(){
    transactionStore.loadTransactions(props.wallet,false,initialPageRequest,search.value);
}

</script>
<template>
    <div class="card transaction-card">
        <div class="card-header">
            <h5>{{$t('transactions')}}</h5> 
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
                                <div class="row">
                                    <span>Type</span><v-select class="form-control" :options="types" v-model="search.type" label='type'/>
                                </div>
                                <div class="row mt-3">
                                    <button class="btn btn-outline-success" @click="doSearch">{{$t('search')}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TransactionList 
                :wallet-id="props.wallet.id!" 
                :transactions="transactionStore.transactions" 
                :page="transactionStore.page" 
                :pages="transactionStore.totalPages" 
                @transaction-delete-transaction="deleteTransaction"
                @transaction-page-change="(i: number)=>transactionStore.pageChange(i)"></TransactionList>
        </div>
    </div>
</template>
<style>
.transaction-card{
    margin-top: 40px;
}
</style>