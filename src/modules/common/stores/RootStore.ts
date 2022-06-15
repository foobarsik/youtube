import {makeAutoObservable} from 'mobx';
import {createContext, useContext} from 'react';
import {Services} from '../../../services/Services';
import {UserStore} from '../../user/store/UserStore';
import {AppStore} from './AppStore';

export class RootStore {
	services: Services;
	appStore: AppStore;
	userStore: UserStore;

	constructor(services: Services) {
		makeAutoObservable(this);
		this.services = services;
		this.appStore = new AppStore(this);
		this.userStore = new UserStore(this);
	}

	async initApp() {
		await this.appStore.init();
	}
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => useContext(RootStoreContext);
