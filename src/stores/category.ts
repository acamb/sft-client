import { defineStore } from 'pinia';
import CategoryDto from './../models/CategoryDto';
import axios from '../axios';

export type CategoryState = {
    categories: CategoryDto[]
}

export const useCategoryStore = defineStore('categories',{
    state: () => ({
        categories: []
    }) as CategoryState,
    getters: {
        category(state){
            return (id:number): CategoryDto | undefined => this.categories.find(c => c.id === id);
        }
    },
    actions: {
        async loadCategories(force: boolean){
            if(this.categories.length == 0 || force ){
                let response = await axios.get<Array<CategoryDto>>("/api/category/all");
                this.categories = response.data ?? [];
            }
        },
        async save(category: CategoryDto){
            if(category.id){
                await axios.put("/api/category/",category);
            }
            else{
                await axios.post("/api/category/",category);
            }
            await this.loadCategories(true);
        },
        async delete(category: CategoryDto){
            await axios.delete(`/api/category/${category.id}`);
            await this.loadCategories(true);
        }
    }
})