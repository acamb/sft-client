<script setup lang="ts">
import { useWalletsStore } from '../stores/wallets';
import BackButton from './BackButton.vue';
import {ref} from 'vue';
import { storeToRefs } from 'pinia';

const walletStore = useWalletsStore();
walletStore.loadUserWallet(false);
const {cryptoWallets} = storeToRefs(walletStore)
</script>
<template>
    <div class="card" v-for="wallet in cryptoWallets">
        <div class="card-header">
            {{ wallet!.name }}
        </div>
        <div class="card-body wallet-body">
            <div>Balance: {{ wallet!.balance }} / {{wallet.currentValue}} Eur</div>
            <div>Description: {{wallet!.description}}</div>
            <div class="d-flex justify-content-between">
                <router-link
                    :to="{
                        name: 'wallet',
                        params: {id: wallet!.id}
                    }"
                    custom
                    v-slot="{ navigate }"
                    >
                    <button class="btn btn-outline-success" @click="navigate">Details</button>
                </router-link>
                <router-link
                    :to="{
                        name: 'addTransaction',
                        params: {walletId: wallet!.id}
                    }"
                    custom
                    v-slot="{ navigate }"
                    >
                    <button class="btn btn-outline-success" @click="navigate">Add transaction</button>
                </router-link>
            </div>
        </div>
    </div>
    <BackButton back="/"/>
</template>
<style>
.wallet-body{
    display:flex;
    flex-direction: column;
}

</style>