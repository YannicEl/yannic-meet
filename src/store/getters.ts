import { GetterTree } from 'vuex';
import { State } from './store';

function getCount({ count }: State) {
	return count;
}

export const getters: GetterTree<State, State> = {
	getCount,
};
