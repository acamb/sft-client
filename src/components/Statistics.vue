<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRoute} from 'vue-router';
import WalletDto from '../models/WalletDto';
import {useStatisticsStore} from "../stores/statistics";
import {usePrevisionStore} from "../stores/prevision";
import {useWalletsStore} from '../stores/wallets';
import BackButton from './BackButton.vue';
import PrevisionChart from './PrevisionChart.vue';
import StatisticsCharts from './StatisticsCharts.vue';

enum RangeSelection {
    CURRENT="Current",
    MONTH="Pick month",
    YEAR="Pick year",
    RANGE="Pick range"
}

interface Month{
    name:string,
    idx: number
}
const currentSelection = ref(RangeSelection.CURRENT);
const currentPrevisionSelection = ref(RangeSelection.MONTH);
const i18n = useI18n();

const months: Array<Month> = [
    {name: i18n.t('months.gen'), idx:0},
    {name: i18n.t('months.feb'), idx:1},
    {name: i18n.t('months.mar'), idx:2},
    {name: i18n.t('months.apr'), idx:3},
    {name: i18n.t('months.may'), idx:4},
    {name: i18n.t('months.jun'), idx:5},
    {name: i18n.t('months.jul'), idx:6},
    {name: i18n.t('months.ago'), idx:7},
    {name: i18n.t('months.sep'), idx:8},
    {name: i18n.t('months.oct'), idx:9},
    {name: i18n.t('months.nov'), idx:10},
    {name: i18n.t('months.dec'), idx:11}
]

const route = useRoute();
const walletId = Number.parseInt(<string>route.params.walletId);

const statisticsStore = useStatisticsStore();
const {incomes,expenses,expensesByCategory} = storeToRefs(statisticsStore);

const previsionStore = usePrevisionStore();
const {estimated,endBalanceEstimated,prevision} = storeToRefs(previsionStore);

const walletStore = useWalletsStore();
const today = new Date();
const startDate = ref(new Date(today.getFullYear(),today.getMonth(),1));
const endDate = ref(new Date());
const previsionStartDate = ref(new Date(today.getFullYear(),today.getMonth(),1));
const previsionEndDate = ref(new Date(today.getFullYear(),today.getMonth()+1,0));
let wallet: WalletDto;
loadData();

async function loadData(){
    await walletStore.loadUserWallet(false);
    wallet = walletStore.wallet(walletId);
    searchStatistics();
}

function searchStatistics(){
    statisticsStore.loadStatistics(wallet,{startDate: startDate.value,endDate: endDate.value});
    searchPrevision();
}

function searchPrevision(){
    previsionStore.loadStatistics(wallet,{startDate: previsionStartDate.value,endDate: previsionEndDate.value});
}

function rangeSelectionToDates(range: RangeSelection,month?: number){
    
    if(range === RangeSelection.CURRENT){
        startDate.value = new Date(today.getFullYear(),today.getMonth(),1);
        endDate.value = new Date();
        endDate.value.setDate(today.getDate()+1);
        searchStatistics();
    }
    else if(range === RangeSelection.MONTH && month != undefined){
        startDate.value = new Date(today.getFullYear(),month,1);
        endDate.value = new Date(today.getFullYear(),month+1,0);
        searchStatistics();
    }
    //RangeSelection.RANGE sets directly startDate and endDate
}

function rangePrevisionToDates(range: RangeSelection,month?: number){
    
    if(range === RangeSelection.MONTH){
        previsionStartDate.value = new Date(today.getFullYear(),today.getMonth(),1);
        previsionEndDate.value = new Date(today.getFullYear(),today.getMonth()+1,0);
        searchPrevision();
    }
    else if(range === RangeSelection.YEAR){
        previsionStartDate.value = today
        previsionEndDate.value = new Date(today.getFullYear()+1,12,1);
        searchPrevision();
    }
    //RangeSelection.RANGE sets directly startDate and endDate
}

</script>
<template>
<div class="container">
    <div class="row">
        <div class="btn-group" role="group">
            <input type="radio" class="btn-check" name="btnRange" id="btnCurrent" autocomplete="off" checked @click="currentSelection = RangeSelection.CURRENT;rangeSelectionToDates(RangeSelection.CURRENT)">
            <label class="btn btn-outline-success" for="btnCurrent">{{$t('current')}}</label>

            <input type="radio" class="btn-check" name="btnRange" id="btnMonth" autocomplete="off" @click="currentSelection = RangeSelection.MONTH">
            <label class="btn btn-outline-success" for="btnMonth">{{$t('pickMonth')}}</label>

            <input type="radio" class="btn-check" name="btnRange" id="btnRange" autocomplete="off" @click="currentSelection = RangeSelection.RANGE">
            <label class="btn btn-outline-success" for="btnRange">{{$t('pickRange')}}</label>
        </div>
        <div v-if="currentSelection === RangeSelection.MONTH">
            <label for="monthSelect">{{$t('month')}}</label>
            <v-select :options="months" label="name" key="idx" @option:selected="(i:Month) => rangeSelectionToDates(RangeSelection.MONTH,i.idx)" ></v-select>
        </div>
        <div v-else-if="currentSelection === RangeSelection.RANGE">
            <label for="startDate">{{$t('startDate')}}</label>
            <date-picker  id="startDate" required v-model="startDate"  :enable-time-picker="false" />
            <label for="endDate">{{$t('endDate')}}</label>
            <date-picker  id="endDate" required v-model="endDate"  :enable-time-picker="false" />
            <button class="btn btn-outline-success" @click="searchStatistics">{{$t('search')}}</button>
        </div>
    </div>
    <div class="row" v-if="expensesByCategory">
        <h3>{{ $t('statistics') }}</h3>
        <StatisticsCharts :incomes="incomes" :expenses="expenses" :expenses-by-category="expensesByCategory"></StatisticsCharts>
    </div>
    <div class="row">
        <h3>{{ $t('previsions') }}</h3>
        <div class="col-md-12"></div>
        <div class="btn-group" role="group">
            <input type="radio" class="btn-check" name="btnPrevisionRange" id="btnPrevisionCurrent" autocomplete="off" checked @click="currentPrevisionSelection = RangeSelection.MONTH;rangePrevisionToDates(RangeSelection.MONTH)">
            <label class="btn btn-outline-success" for="btnPrevisionCurrent">{{$t('month')}}</label>

            <input type="radio" class="btn-check" name="btnPrevisionRange" id="btnPrevisionMonth" autocomplete="off" @click="currentPrevisionSelection = RangeSelection.YEAR;rangePrevisionToDates(RangeSelection.YEAR)">
            <label class="btn btn-outline-success" for="btnPrevisionMonth">{{$t('year')}}</label>

            <input type="radio" class="btn-check" name="btnPrevisionRange" id="btnPrevisionRange" autocomplete="off" @click="currentPrevisionSelection = RangeSelection.RANGE">
            <label class="btn btn-outline-success" for="btnPrevisionRange">{{$t('pickRange')}}</label>
        </div>
        <div class="col-md-12">
            <div v-if="currentPrevisionSelection === RangeSelection.RANGE">
                <label for="previsionStartDate">{{$t('startDate')}}</label>
                <date-picker  id="previsionStartDate" required v-model="previsionStartDate" :enable-time-picker="false" />
                <label for="previsionEndDate">{{$t('endDate')}}</label>
                <date-picker  id="previsionEndDate" required v-model="previsionEndDate" :enable-time-picker="false" />
                <button class="btn btn-outline-success" @click="searchPrevision">{{$t('search')}}</button>
            </div>
        </div>
        <div class="col-md-12">
            <PrevisionChart :prevision="prevision" :estimation="estimated" :end-balance-estimated="endBalanceEstimated"></PrevisionChart>
        </div>
    </div>
    <BackButton></BackButton>
</div>
</template>