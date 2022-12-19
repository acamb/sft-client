<script setup lang="ts">
import { WalletStatistics } from '../models/WalletStatistics';
import Chart from 'chart.js/auto';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';

const props = defineProps<{
    statistics: WalletStatistics
}>();
let chart: Chart;
const i18n = useI18n();
watch(()=>props.statistics,()=> createChart());
setTimeout(()=>createChart(),200);
function createChart(){
    if(chart != undefined){
        chart.destroy();
    }
    chart = new Chart(document.getElementById("expensesByCategory"),{
        type: 'doughnut',
        data: statisticsToChartData(props.statistics)
    });
}

function statisticsToChartData(statistics: WalletStatistics){
    let categories = Object.keys(statistics.expensesByCategory ?? {});
    return {
        labels: categories,
        datasets: [{
            label: i18n.t('expensesByCategory'),
            data: categories.map(c => statistics.expensesByCategory[c])
        }]
    }
}


</script>
<template>
    <div>
        <b>{{ $t('totalIncome') }}: {{ statistics.incomes }}</b><br/>
        <b>{{ $t('totalOutcome') }}: {{ statistics.expenses }}</b><br/>
        <b>{{ $t('netValue') }}: {{ statistics.incomes+statistics.expenses }}</b><br/>
        <div class="row d-flex align-items-center">
            <div class="col-md-6 col-sm-6">
                <canvas id="expensesByCategory" ></canvas>
            </div>
            <div class="col-md-6 col-sm-6 " >
                Expenses:
                <ul>
                    <li v-for="category in Object.keys(statistics.expensesByCategory)">
                        {{ category }}: {{ statistics.expensesByCategory[category] }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
</style>