import 'virtual:windi.css';
import { createApp } from 'vue';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(firestorePlugin);
app.mount('#app');
