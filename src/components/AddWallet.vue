<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import WalletDto from '../models/WalletDto';
import router from '../router';
import { useWalletsStore } from '../stores/wallets';
import BackButton from './BackButton.vue';

const route = useRoute();
const walletStore = useWalletsStore();
const props = defineProps({
    walletId: number
});
const wallet = ref(walletStore.wallet(props.walletId) ?? <WalletDto>{});
function submit(){
    walletStore.save(wallet.value);
    router.push("/wallets");
}
</script>
<template>
<form @submit.prevent="submit">
    <div class="mb-3">
        <label class="form-label" label-for="name">{{$t('name')}}</label>
        <input class="form-input" id="name" required v-model="wallet.name"/>
    </div>
    <div class="mb-3">
        <label class="form-label" label-for="description">{{$t('description')}}</label>
        <input class="form-input" id="description" v-model="wallet.description"/>
    </div>
    <button class="btn btn-outline-success">{{$t('save')}}</button>
    <BackButton/>
</form>
</template>