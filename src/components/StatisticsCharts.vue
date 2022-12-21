<script setup lang="ts">
import Chart, { ChartItem } from 'chart.js/auto';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
import autocolors from 'chartjs-plugin-autocolors';

const props = defineProps<{
    incomes: number,
    expenses: number,
    expensesByCategory: Map<string,number>
}>();
let chart: Chart;
const i18n = useI18n();
watch(()=>props.expensesByCategory,()=> createChart());
setTimeout(()=>createChart(),200);
function createChart(){
    if(chart != undefined){
        chart.destroy();
    }
    chart = new Chart(<ChartItem>document.getElementById("expensesByCategory"),{
        type: 'doughnut',
        data: statisticsToChartData(props.expensesByCategory),
        plugins: [{id:'autocolor',...autocolors}],
        options: {
            plugins: {
            autocolors: {
                mode: 'data'
            }
        }
  }
    });
}

function statisticsToChartData(statistics: Map<string,number>){
    let categories = Array.from(statistics.keys());
    return {
        labels: categories,
        datasets: [{
            label: i18n.t('value'),
            data: categories.map(c => statistics.get(c))
        }]
    }
}


</script>
<template>
    <div>
        <b>{{ $t('totalIncome') }}: {{ incomes }}</b><br/>
        <b>{{ $t('totalOutcome') }}: {{ expenses }}</b><br/>
        <b>{{ $t('netValue') }}: {{ incomes+expenses }}</b><br/>
        <div class="row d-flex align-items-center">
            <div class="col-md-6 col-sm-6">
                <canvas id="expensesByCategory" ></canvas>
            </div>
            <div class="col-md-6 col-sm-6 " >
                Expenses:
                <ul>
                    <li v-for="category in expensesByCategory.keys()">
                        {{ category }}: {{ expensesByCategory.get(category) }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
</style>