import { useScheduledTransactionsStore } from './stores/scheduledTransactions';
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
import AddWallet from './components/AddWallet.vue'
import AddCategory from './components/AddCategory.vue'
import AddScheduledTransaction from './components/AddScheduledTransaction.vue'
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
    { path: '/addCategory', component: AddCategory },
    { path: '/editCategory/:id', component: AddCategory },
    { path: '/addTransaction/:walletId', component: AddTransaction, name: 'addTransaction' },
    { path: '/editTransaction/:walletId/:transactionId', component: AddTransaction, name: 'editTransaction' },
    { path: '/addScheduledTransaction/:walletId', component: AddScheduledTransaction, name: 'addScheduledTransaction' },
    { path: '/editScheduledTransaction/:walletId/:transactionId', component: AddScheduledTransaction, name: 'editScheduledTransaction' },
    { path: '/addWallet', component: AddWallet },
    { path: '/editWallet/:id', component: AddWallet },
    { path: '/wallet/:id', component: Wallet, name: 'wallet'},
    { path: '/login', component: LoginPage, name: 'Login' },
    { path: '/error', component: GenericError, name: 'error' }
  ];