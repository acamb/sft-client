<script setup lang="ts">
import CategoryDto from '../models/CategoryDto';
import {ref} from 'vue';
import { useCategoryStore } from '../stores/category';
import router from '../router'
import BackButton from './BackButton.vue';
const categoryStore = useCategoryStore();
const props = defineProps({
    categoryId: number
})
const category = ref(props.categoryId ? categoryStore.category(props.categoryId) : <CategoryDto>{name: '',description: ''});


function submit(){
    categoryStore.save(category.value);
    router.push('/categories');
}
</script>
<template>
<form @submit.prevent="submit">
    <div class="mb-3">
        <label class="form-label" label-for="name">{{$t('name')}}</label>
        <input class="form-input" id="name" required v-model="category.name"/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="description">{{$t('description')}}</label>
        <input class="form-input" id="description" v-model="category.description"/>
    </div>
    <button class="btn btn-outline-success">{{$t('save')}}</button>
    <BackButton/>
</form>
</template>