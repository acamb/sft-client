<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useWalletsStore } from '../stores/wallets';
import BackButton from './BackButton.vue';
import {ref} from 'vue';
import WalletTransactions from './WalletTransactions.vue';
import WalletScheduledTransactions from './WalletScheduledTransactions.vue';

const route = useRoute();
const walletId = Number.parseInt(<string>route.params.id);
const walletStore = useWalletsStore();
const wallet = ref(walletStore.wallet(walletId));


</script>
<template>
    <div class="container">
        <div class="row mb-5">
            <p><b>wallet</b>: {{wallet.name}}</p>
            <p><b>balance</b>: {{wallet.balance}}</p>
        </div>
        <div class="row">
            <router-link
                        :to="{
                            name: 'addTransaction',
                            params: {walletId: wallet.id}
                        }"
                        custom
                        v-slot="{ navigate }"
                        >
                        <button class="btn btn-outline-success mb-3" @click="navigate">Add transaction</button>
            </router-link>
            <router-link
                        :to="{
                            name: 'addScheduledTransaction',
                            params: {walletId: wallet.id}
                        }"
                        custom
                        v-slot="{ navigate }"
                        >
                        <button class="btn btn-outline-success" @click="navigate">Add scheduled transaction</button>
            </router-link>
        </div>
        <div class="row">
            <WalletTransactions :wallet="wallet"></WalletTransactions>
        </div>
        
        <div class="row">
            <WalletScheduledTransactions :wallet="wallet"></WalletScheduledTransactions>
        </div>
        <BackButton back="/wallets"/>
    </div>
</template>
