import 'virtual:windi.css';
import { createApp } from 'vue';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';
import { router } from './router';
import { store, key } from './store/store';

const app = createApp(App);

app.use(router);
app.use(store, key);
app.use(firestorePlugin);
app.mount('#app');
