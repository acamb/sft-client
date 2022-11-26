<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useWalletsStore } from '../stores/wallets';

const route = useRoute();
const walletId = <number><unknown> route.params.id
const walletStore = useWalletsStore();
const wallet = walletStore.wallet(walletId);
</script>
<template>
    <div> add transaction </div>
    //TODO
</template>