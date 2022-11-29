<script setup lang="ts">
import CategoryDto from '../models/CategoryDto';
import { useCategoryStore } from '../stores/category';
import router from '../router';
import BackButton from './BackButton.vue';

const categoryStore = useCategoryStore();

function deleteCategory(category: CategoryDto){
    categoryStore.delete(category);
}

function editCategory(category: CategoryDto){
    if(category.id){
        router.push({path: `/editCategory/${category.id}`,});
    }
    else{
        router.push('/addCategory');
    }
}
</script>
<template>
    <div>
        <div class="border category" v-for="c in categoryStore.categories">
            <span>{{ c.name }}</span>
            <span>
                <button class="btn" @click="editCategory(c)"><i class="bi bi-pencil-square"></i></button>
                <button class="btn" @click="deleteCategory(c)"><i class="bi bi-x-circle"></i></button>
            </span>
        </div>
    </div>
    <BackButton/>
</template>