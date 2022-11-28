import { defineStore } from 'pinia'
import UserDto from '../models/UserDto';
import axios from '../axios'
export type UserState = {
    user: UserDto;
}

export const useUserStore = defineStore('user',{
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')) : <unknown>undefined
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
            try{
                let response = await axios.post("api/login",{username,password})
                this.user = response.data.user;
                sessionStorage.setItem('authenticated','true');
                sessionStorage.setItem('user',JSON.stringify(this.user));
                return true;
            }
            catch(err){
                return false;
            }
        }
    }
});