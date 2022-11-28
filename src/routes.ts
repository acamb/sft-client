import { vue } from '@vitejs/plugin-vue';
import { useCategoryStore } from './stores/category';

import Home from './components/Home.vue'
import Wallets from './components/Wallets.vue'
import Categories from './components/Categories.vue'
import AddTransaction from './components/AddTransaction.vue'
import LoginPage from './components/LoginPage.vue'
import Wallet from './components/Wallet.vue'
import GenericError from './components/GenericError.vue'
import { useWalletsStore } from './stores/wallets'
import EditWallet from './components/EditWallet.vue'

async function loadInitialData(){
  const walletStore = useWalletsStore();
  const categoryStore = useCategoryStore();
   await walletStore.loadUserWallet(false);
   await categoryStore.loadCategories(false);
}
export const routes = [
    { path: '/', component: Home, beforeEnter: ()=> loadInitialData(), name: 'Home' },
    { path: '/wallets', component: Wallets },
    { path: '/categories', component: Categories },
    { path: '/addTransaction', component: AddTransaction,props: true },
    { path: '/addWallet', component: EditWallet },
    { path: '/editWallet', component: EditWallet,props: true },
    { path: '/wallet/:id', component: Wallet,props: true},
    { path: '/login', component: LoginPage, name: 'Login' },
    { path: '/error', component: GenericError, name: 'error' }
  ];