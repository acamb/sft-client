import { defineStore } from 'pinia'
import UserDto from '../models/UserDto';
import axios from '../axios'
export type UserState = {
    user: UserDto;
}

interface LoginResponse {
    user: UserDto,
    token: string
}

export const useUserStore = defineStore('user',{
    state: () => ({
        user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')!) : <unknown>undefined
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
                let response = await axios.post<LoginResponse>("api/login",{username,password})
                this.user = response.data.user;
                sessionStorage.setItem('authenticated','true');
                sessionStorage.setItem('user',JSON.stringify(this.user));
                sessionStorage.setItem('token',response.data.token);
                return true;
            }
            catch(err){
                return false;
            }
        }
    }
});