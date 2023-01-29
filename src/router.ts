import { useCategoryStore } from './stores/category';
import {routes} from './routes'
import {createRouter,createWebHistory} from 'vue-router'
import { useWalletsStore } from './stores/wallets';
import {useCryptoCurrencyStore} from "./stores/cryptoCurrency";
async function loadInitialData(){
    const walletStore = useWalletsStore();
    const categoryStore = useCategoryStore();
    const currencyStore = useCryptoCurrencyStore();
    await walletStore.loadUserWallet(false);
    await categoryStore.loadCategories(false);
    await currencyStore.load(false);
  }
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
    });
router.beforeEach(async (to, from) => {
    if (!sessionStorage.getItem('authenticated') && to.name !== 'Login') {
        return { name: 'Login' }
    }
    else if(sessionStorage.getItem('authenticated') && to.name === 'Login'){
        return { name: 'Home' }
    }
    else if(sessionStorage.getItem('authenticated')){
        await loadInitialData();
    }
});
export default router;