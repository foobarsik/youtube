import {ApiErrorResponse, ApiResponse} from 'apisauce';
import {makeAutoObservable} from 'mobx';
import {VideoCategories} from '../../../services/api/VideoCategories';
import {ServerError} from '../../../services/api/ServerError';
import {RootStore} from '../../common/stores/RootStore';
import {ErrorHandler} from '../../common/utils/ErrorHandler';
import {LoadingState} from '../../common/utils/LoadingState';

export class VideoCategoriesStore {
	private readonly rootStore: RootStore;

	categories: {id: string; title: string}[] = [];
	loadingState: LoadingState = LoadingState.DONE;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		this.rootStore = rootStore;

		this.getCategories();
	}

	*getCategories() {
		let langCode = 'pl'; // TODO get language from app settings
		let regionCode = 'PL'; // TODO get location from device or app settings
		const response: ApiResponse<VideoCategories, ServerError> = yield this.rootStore.services.api.fetchVideoCategories(
			langCode,
			regionCode,
		);

		if (response.ok && response.data?.items) {
			this.categories = response.data.items
				.filter(item => item.snippet.assignable) // Unassignable categories can't be used in youtube api requests, so we store only assignable
				.map(item => ({
					id: item.id,
					title: item.snippet.title,
				}));
		} else {
			ErrorHandler.handleApiProblem(
				response as ApiErrorResponse<ServerError>,
				this.rootStore.services.errorTracking,
				this.setLoadingState,
			);
		}
	}

	setLoadingState(state: LoadingState) {
		this.loadingState = state;
	}
}
