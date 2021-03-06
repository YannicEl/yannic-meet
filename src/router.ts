import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import RtcTest from './components/RtcTest.vue';

const history = createWebHistory();

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/rtc',
		component: RtcTest,
	},
];

export const router = createRouter({
	history,
	routes,
});
