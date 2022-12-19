<script setup lang="ts">
import { stringifyExpression } from '@vue/compiler-core';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { loadRouteLocation, useRoute } from 'vue-router';
import WalletDto from '../models/WalletDto';
import {useStatisticsStore} from "../stores/statistics";
import { useWalletsStore } from '../stores/wallets';
import BackButton from './BackButton.vue';
import StatisticsCharts from './StatisticsCharts.vue';

enum RangeSelection {
    CURRENT="Current",
    MONTH="Pick month",
    RANGE="Pick range"
}

interface Month{
    name:string,
    idx: number
}
const currentSelection = ref(RangeSelection.CURRENT);

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
const {statistics} = storeToRefs(statisticsStore);
const walletStore = useWalletsStore();
const today = new Date();
const startDate = ref(new Date(today.getFullYear(),today.getMonth(),1));
const endDate = ref(new Date());
let wallet: WalletDto;
loadData();

async function loadData(){
    await walletStore.loadUserWallet(false);
    wallet = walletStore.wallet(walletId);
    searchStatistics();
}

function searchStatistics(){
    statisticsStore.loadStatistics(wallet,{startDate: startDate.value,endDate: endDate.value});
}

function rangeSelectionToDates(range: RangeSelection,month?: number){
    
    if(range === RangeSelection.CURRENT){
        startDate.value = new Date(today.getFullYear(),today.getMonth(),1);
        endDate.value = new Date();
        endDate.value.setDate(today.getDate()+1);
        searchStatistics();
    }
    else if(range === RangeSelection.MONTH && month){
        startDate.value = new Date(today.getFullYear(),month,1);
        endDate.value = new Date(today.getFullYear(),month+1,0);
        searchStatistics();
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
    <div class="row" v-if="statistics?.expensesByCategory">
        <StatisticsCharts :statistics="statistics"></StatisticsCharts>
    </div>
    <BackButton></BackButton>
</div>
</template>