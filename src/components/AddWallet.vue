<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import WalletDto from '../models/WalletDto';
import router from '../router';
import { useWalletsStore } from '../stores/wallets';
import BackButton from './BackButton.vue';

const route = useRoute();
const walletStore = useWalletsStore();

const wallet = ref(walletStore.wallet(Number.parseInt(<string>route.params.id)) ?? <WalletDto>{});
function submit(){
    console.log(`name: ${wallet.value.name}`)
    walletStore.save({...wallet.value});
    router.push("/wallets");
}
</script>
<template>
<form @submit.prevent="submit">
    <div class="mb-3">
        <label class="form-label" label-for="name">{{$t('name')}}</label>
        <input class="form-control" id="name" required v-model="wallet.name"/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="description">{{$t('description')}}</label>
        <input class="form-control" id="description" v-model="wallet.description" required/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="balance">{{$t('balance')}}</label>
        <input type="number" class="form-control" id="balance" v-model="wallet.balance" required/>
    </div>
    <button class="btn btn-outline-success">{{$t('save')}}</button>
    <BackButton back="/"/>
</form>
</template>