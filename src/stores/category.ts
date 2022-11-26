import { defineStore } from 'pinia';
import CategoryDto from './../models/CategoryDto';

export type CategoryState = {
    categories: CategoryDto[]
}

export const useCategoryStore = defineStore('categories',{
    state: () => ({
        categories: <unknown> undefined
    }) as CategoryState,
    actions: {
        async loadCategories(force: boolean){
            //TODO
            console.log('loading categories');
            return new Promise( resolve => setTimeout(resolve, 1000) )
        },
        async save(category: CategoryDto){
            if(category.id){
                //TODO
            }
            else{
                //TODO
            }
        },
        async delete(category: CategoryDto){
            //TODO
        }
    }
})