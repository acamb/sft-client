<script setup lang="ts">
import CategoryDto from '../models/CategoryDto';
import { useCategoryStore } from '../stores/category';
import router from '../router';
import BackButton from './BackButton.vue';

const categoryStore = useCategoryStore();

function deleteCategory(category: CategoryDto){
    categoryStore.delete(category);
}

function editCategory(category: CategoryDto | undefined){
    if(category?.id){
        router.push({path: `/editCategory/${category.id}`,});
    }
    else{
        router.push('/addCategory');
    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <button class="btn btn-outline-success w-auto" @click="editCategory(undefined)">{{ $t('addCategory')}}</button>
        </div>
        <div class=" category-container flex-column row ">
            <div class="d-flex justify-content-between cat-box " v-for="c in categoryStore.categories">
                <div>{{ c.name }}</div>
                <div>
                    <button class="btn btn-outline-primary" @click="editCategory(c)"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-outline-danger" @click="deleteCategory(c)"><i class="bi bi-x-circle"></i></button>
                </div>
            </div>
        </div>
        <div class="row">
            <BackButton class="w-auto" :back="'/'"/>
        </div>
    </div>
</template>
<style>
.category-container{
    width: 40vw;
}
.cat-box:hover{
    background-color: rgb(221, 221, 221);
}
</style>