import {makeAutoObservable} from 'mobx';
import {RootStore} from '../../common/stores/RootStore';
import {LoadingState} from '../../common/utils/LoadingState';

export class UserStore {
	private readonly rootStore: RootStore;

	loadingState: LoadingState = LoadingState.DONE;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		this.rootStore = rootStore;
	}

	setLoadingState(state: LoadingState) {
		this.loadingState = state;
	}
}
