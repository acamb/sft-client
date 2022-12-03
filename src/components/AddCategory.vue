<script setup lang="ts">
import CategoryDto from '../models/CategoryDto';
import {ref} from 'vue';
import { useCategoryStore } from '../stores/category';
import router from '../router'
import BackButton from './BackButton.vue';
import { useRoute } from 'vue-router';
const categoryStore = useCategoryStore();
const route = useRoute();
const category = ref(categoryStore.category(Number.parseInt(<string>route.params.id)) ?? <CategoryDto>{name: '',description: ''});


function submit(){
    categoryStore.save(category.value!);
    router.push('/categories');
}
</script>
<template>
<div class="container">
    <form @submit.prevent="()=>submit()">
        <div class="mb-3">
            <label class="form-label" label-for="name">{{$t('name')}}</label>
            <input class="form-control" id="name" required v-model="category.name"/>
        </div>
        <div class="mb-3">
            <label class="form-label" label-for="description">{{$t('description')}}</label>
            <input class="form-control" id="description" v-model="category.description"/>
        </div>
        <div class="mb-3 form-check">
            <label class="form-check-label" label-for="canBePositive">{{$t('canBePositive')}}</label>
            <input class="form-check-input" type="checkbox" id="canBePositive" v-model="category.canBePositive"  />
        </div>
        <div class="mb-3 form-check">
            <label class="form-check-label" label-for="canBeNegative">{{$t('canBeNegative')}}</label>
            <input class="form-check-input" type="checkbox" id="canBeNegative" v-model="category.canBeNegative"  />
        </div>
        <button class="btn btn-outline-success">{{$t('save')}}</button>
        <BackButton back="/"/>
    </form>
</div>
</template>