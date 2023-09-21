import {makeAutoObservable} from 'mobx';
import {createContext, useContext} from 'react';
import {Services} from '../../../services/Services';
import {UserStore} from '../../user/store/UserStore';
import {VideoCategoriesStore} from '../../videoCategories/store/VideoCategoriesStore';
import {VideosStore} from '../../videos/store/VideosStore';
import {AppStore} from './AppStore';

export class RootStore {
	services: Services;
	appStore: AppStore;
	userStore: UserStore;
	videosStore: VideosStore;
	videoCategoriesStore: VideoCategoriesStore;

	constructor(services: Services) {
		makeAutoObservable(this);
		this.services = services;
		this.appStore = new AppStore(this);
		this.userStore = new UserStore(this);
		this.videosStore = new VideosStore(this);
		this.videoCategoriesStore = new VideoCategoriesStore(this);
	}

	async initApp() {
		await this.appStore.init();
	}
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => useContext(RootStoreContext);
