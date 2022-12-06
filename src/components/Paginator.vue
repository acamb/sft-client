<script setup lang="ts">
import { computed,ref } from '@vue/reactivity';

interface Page{
    index: number,
    class: string,
    text: string,
    current: boolean
}
const props = defineProps<{
    page: number,
    totalPages: number,
    range?: number
}>();
const emits = defineEmits<{
    (e: 'change',page: number): void
}>();
const range = ref(props.range ?? 1);
const pagination = computed((): Array<Page> => {
    let pages = [];
    let minShrinked = false;
    let maxShrinked = false;
    for(let i = 1;i < props.totalPages;i++){
        if(i < props.page-range.value && !minShrinked){
            pages.push({index: i,text: '...',class:'page-shrink',current: props.page === i});
            minShrinked = true;
        }
        else if(i > props.page+range.value && !maxShrinked){
            pages.push({index: i,text: '...',class:'page-shrink',current: props.page === i});
            maxShrinked = true;
        }
        else if(i >= props.page-range.value || i <= props.page+range.value){
            pages.push({index: i,text: `${i}`,class:'page',current: props.page === i})
        }
    }
    return pages;
});
function click(page: Page){
    emits('change',page.index);
}
</script>
<template>
<ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" :disabled="props.page === 1">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for="p in pagination" :key="p.index">
        <a class="page-link" href="#" :disabled="p.current" :class="p.class" @click="()=>click(p)">{{p.text}}</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" :disabled="(props.page === computed.length)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
</ul>
</template>
<style>
.page{
}
.page-shrink{
    color: gray;
    font-style: italic;
}
.page-active{
    color: rgb(49, 49, 197);
    font-weight: bold;
}
</style>