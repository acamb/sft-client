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
import Statistics from './components/Statistics.vue'
import CryptoWallets from "./components/CryptoWallets.vue";
import CryptoCurrencies from "./components/CryptoCurrencies.vue";
import AddCryptoCurrency from "./components/AddCryptoCurrency.vue";


export const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/wallets', component: Wallets },
    { path: '/cryptowallets', component: CryptoWallets },
    { path: '/categories', component: Categories },
    { path: '/currencies', component: CryptoCurrencies },
    { path: '/addCategory', component: AddCategory },
    { path: '/addCurrency', component: AddCryptoCurrency },
    { path: '/editCurrency/:id', component: AddCryptoCurrency },
    { path: '/addTransaction/:walletId', component: AddTransaction, name: 'addTransaction' },
    { path: '/editTransaction/:walletId/:transactionId', component: AddTransaction, name: 'editTransaction' },
    { path: '/addScheduledTransaction/:walletId', component: AddScheduledTransaction, name: 'addScheduledTransaction' },
    { path: '/editScheduledTransaction/:walletId/:transactionId', component: AddScheduledTransaction, name: 'editScheduledTransaction' },
    { path: '/addWallet', component: AddWallet },
    { path: '/editWallet/:id', component: AddWallet },
    { path: '/wallet/:id', component: Wallet, name: 'wallet'},
    { path: '/statistics/:walletId', component: Statistics, name: 'statistics'},
    { path: '/login', component: LoginPage, name: 'Login' },
    { path: '/error', component: GenericError, name: 'error' }
  ];