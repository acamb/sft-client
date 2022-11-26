<script setup lang="ts">
import CategoryDto from '../models/CategoryDto';
import {ref} from 'vue';
import { useCategoryStore } from '../stores/category';
const props = defineProps({
    category: {type: CategoryDto}
})
const category: CategoryDto = ref(props.category ? props.category : {});
const categoryStore = useCategoryStore();
function submit(){
    categoryStore.save(category);
}
</script>
<template>
//TODO
</template>