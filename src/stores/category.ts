import { defineStore } from 'pinia';
import CategoryDto from './../models/CategoryDto';
import axios from '../axios';

export type CategoryState = {
    categories: CategoryDto[]
}

export const useCategoryStore = defineStore('categories',{
    state: () => ({
        categories: <unknown> undefined
    }) as CategoryState,
    getters: {
        category(state){
            return (id:number): CategoryDto | undefined => this.categories.find(c => c.id === id);
        }
    },
    actions: {
        async loadCategories(force: boolean){
            let response = await axios.get<Array<CategoryDto>>("/api/categories");
            this.categories = response.data ?? [];
        },
        async save(category: CategoryDto){
            if(category.id){
                await axios.put("/api/categories",category);
            }
            else{
                await axios.post("/api/categories",category);
            }
            await this.loadCategories(true);
        },
        async delete(category: CategoryDto){
            await axios.delete(`/api/categories/${category.id}`);
            await this.loadCategories(true);
        }
    }
})