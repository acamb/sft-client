<script setup lang="ts">
import { ref} from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const username = ref('');
const password = ref('');
const userStore = useUserStore();
const router = useRouter();
const loginError = ref('');
async function login(){
    let result = await userStore.login(username.value,password.value);
    if(result){
        router.push('/'); 
    }
    else{
        loginError.value = 'Username or password invalid'; //TODO internationalization
    }
}
</script>
<template>
    <div class="container">
        <div v-if="loginError" class="alert alert-danger">
            {{loginError}}
        </div>
        <form @submit.prevent="login">
            <div class="mb-3">
                <label for="username" class="form-label">{{ $t('username') }}</label><input class="form-control" id="username" v-model="username" required/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">{{ $t('password') }}</label><input type="password" class="form-control" id="password" v-model="password" required/>
            </div>
            <button type="submit" class="btn btn-outline-success">{{ $t('login') }}</button> 
        </form>
    </div>
</template>