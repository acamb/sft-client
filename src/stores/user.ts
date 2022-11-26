import { defineStore } from 'pinia'
import UserDto from '../models/UserDto';

export type UserState = {
    user: UserDto;
}

export const useUserStore = defineStore('user',{
    state: () => ({
        user: <unknown> undefined
    } as UserState),
    getters: {
        currentUser(): UserDto | undefined {
            if(this.user == null && sessionStorage.getItem('user') != null ){
                this.user = JSON.parse(sessionStorage.getItem('user')!)
            }
            return this.user;
        }
    },
    actions: {
        async login(username: String,password: String): Promise<boolean>{
            //TODO call api
            this.user = {
                username: 'test'
            }
            sessionStorage.setItem('authenticated','true');
            sessionStorage.setItem('user',JSON.stringify(this.user));
            return true;
        }
    }
});