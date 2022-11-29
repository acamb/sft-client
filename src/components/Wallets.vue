<script setup lang="ts">
import { useWalletsStore } from '../stores/wallets';
import BackButton from './BackButton.vue';

const walletStore = useWalletsStore();
</script>
<template>
    <div class="card" v-for="wallet in walletStore.wallets">
        <div class="card-header">
            {{ wallet!.description }}
        </div>
        <div class="card-body">
            Balance: {{ wallet!.balance }}
            <router-link
                :to="{
                    path: '/wallet/',
                    params: {id: wallet!.id}
                }"
                custom
                v-slot="{ navigate }"
                >
                <button class="btn btn-outline-success" @click="navigate">Details</button>
            </router-link>
            <router-link
                :to="{
                    path: '/addTransaction/',
                    params: {id: wallet!.id}
                }"
                custom
                v-slot="{ navigate }"
                >
                <button class="btn btn-outline-success">Add transaction</button>
            </router-link>
        </div>
    </div>
    <BackButton/>
</template>