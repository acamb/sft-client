<script setup lang="ts">
import Chart, { ChartItem } from 'chart.js/auto';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';

const props = defineProps<{
    endBalanceEstimated: number,
    prevision: Map<string,number>,
    estimation: Map<string,number>
}>();
let chart: Chart;
const i18n = useI18n();
watch(()=>props.prevision,()=> createChart());
setTimeout(()=>createChart(),200);
function createChart(){
    if(chart != undefined){
        chart.destroy();
    }
    chart = new Chart(<ChartItem>document.getElementById("prevision"),{
        type: 'line',
        data: statisticsToChartData(props.prevision,props.estimation),    
        options:{
            hover: {
                mode: 'nearest'
            }
        }  
    });
}

function statisticsToChartData(prevision: Map<string,number>,estimation: Map<string,number>){
    let dates = Array.from(prevision.keys()).sort();
    return {
        labels: dates,
        datasets: [{
            label: i18n.t('value'),
            data: dates.map(c => prevision.get(c))
        },
        {
            label: i18n.t('estimated'),
            data: dates.map(c => estimation.get(c))
        }
        ]
    }
}


</script>
<template>
    <div>
        <div class="col-md-12">
            <canvas id="prevision" ></canvas>
        </div>
        <div class="col-md-12">
            {{ $t('estimatedNet') }}: {{ endBalanceEstimated }}
        </div>
    </div>
</template>
<style>
</style>