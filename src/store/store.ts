import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export interface State {
	count: number;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		count: 0,
	},
	mutations,
	actions,
	getters,
});

export function useStore() {
	return baseUseStore(key);
}
