import { createPinia } from 'pinia';
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import 'bootstrap';
import {messages} from './messages';
import {createI18n} from 'vue-i18n';
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';


const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

app.use(router);

const i18n = createI18n({
    locale: 'en',
    messages
}
);
app.use(i18n);
app.config.errorHandler = (err) => {
    router.push('/error');
  };

app.component('v-select',VueSelect)

app.mount('#app')
