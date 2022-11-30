<script setup lang="ts">
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>
<template>
    <div class="button-container">
        <router-link
      to="/wallets"
      custom
      v-slot="{ navigate }"
    >
        <button class="btn btn-outline-primary home-button d-flex justify-content-between" @click="navigate">{{ $t("mywallets") }}&nbsp;<i class="bi bi-wallet2"></i></button>
    </router-link>
    <router-link
      to="/addWallet"
      custom
      v-slot="{ navigate }"
    >
        <button class="btn btn-outline-primary home-button d-flex justify-content-between" @click="navigate">{{ $t("addWallet") }}&nbsp;<i class="bi bi-wallet2"></i></button>
    </router-link>
    <router-link
      to="/categories"
      custom
      v-slot="{ navigate }"
    >
        <button class="btn btn-outline-primary home-button d-flex justify-content-between" @click="navigate">{{ $t("manageCategories") }}&nbsp;<i class="bi bi-tag"></i></button>
    </router-link>
    </div>
</template>
<style>
.button-container{
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
}
.home-button{
    margin: 10px;
    width: 70vw;
}
</style>