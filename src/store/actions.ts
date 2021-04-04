import { ActionContext, ActionTree } from 'vuex';
import { State } from './store';

type Context = ActionContext<State, State>;

function increment({ state }: Context) {
	state.count++;
}

export const actions: ActionTree<State, State> = {
	increment,
};
