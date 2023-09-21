import {ApiResponse} from 'apisauce';
import {makeAutoObservable} from 'mobx';
import {Videos} from '../../../services/api/Videos';
import {ServerError} from '../../../services/api/ServerError';
import {RootStore} from '../../common/stores/RootStore';
import {LoadingState} from '../../common/utils/LoadingState';
import {ApiResponseStore} from '../../common/stores/ApiResponseStore';

export class VideosStore {
	private readonly rootStore: RootStore;

	response: ApiResponseStore;
	categoryId?: string;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		this.response = new ApiResponseStore(rootStore);
		this.rootStore = rootStore;
	}

	*getVideos(categoryId?: string) {
		if (!this.fetchingMoreFromSameCategory(categoryId)) {
			this.response.resetStateData();
			this.categoryId = categoryId;
		} else if (!this.response.isMoreToFetch) {
			return;
		}
		this.response.loadingState = LoadingState.PENDING;
		const response: ApiResponse<Videos, ServerError> = yield this.rootStore.services.api.fetchVideos(
			this.categoryId,
			this.response.nextPageToken,
		);
		this.response.handle(response);
	}

	fetchingMoreFromSameCategory(categoryId?: string) {
		return this.categoryId === categoryId;
	}
}
