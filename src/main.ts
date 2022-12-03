import { createPinia } from 'pinia';
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import 'bootstrap';
import {i18n} from './i18n'
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

app.use(router);

app.use(i18n);
app.config.errorHandler = (err) => {
  console.log(err);
    router.push('/error');
  };

app.component('v-select',VueSelect);
app.component('date-picker',Datepicker);


app.mount('#app')
