import { MutationTree } from 'vuex';
import { State } from './store';

function increment(state: State) {
	state.count++;
}

export const mutations: MutationTree<State> = {
	increment,
};
