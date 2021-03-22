import { createRouter, createWebHistory } from 'vue-router';
import About from './components/About.vue';
import Home from './components/Home.vue';

const history = createWebHistory();

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/about',
		component: About,
	},
];

const router = createRouter({
	history,
	routes,
});

export default router;
