import {ApiErrorResponse, ApiResponse} from 'apisauce';
import {makeAutoObservable} from 'mobx';
import {Videos} from '../../../services/api/Videos';
import {ServerError} from '../../../services/api/ServerError';
import {RootStore} from '../../common/stores/RootStore';
import {ErrorHandler} from '../../common/utils/ErrorHandler';
import {LoadingState} from '../../common/utils/LoadingState';
import {Video} from '../types/video';

export class VideosStore {
	private readonly rootStore: RootStore;

	videos: Video[] = [];
	loadingState: LoadingState = LoadingState.DONE;
	nextPageToken: string | undefined;
	categoryId: string | undefined;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		this.rootStore = rootStore;

		this.getVideos();
	}

	*getVideos(categoryId?: string) {
		if (this.categoryId !== categoryId) {
			this.videos = [];
			this.categoryId = categoryId;
		}
		const response: ApiResponse<Videos, ServerError> = yield this.rootStore.services.api.fetchVideos(
			this.categoryId,
			this.nextPageToken,
		);
		if (response.ok && response.data?.items) {
			let videos = response.data.items.map(item => ({
				id: item.id,
				title: item.snippet.title,
				thumbnail: item.snippet.thumbnails.high,
			}));
			this.videos.push(...videos);
			this.nextPageToken = response.data.nextPageToken;
		} else {
			// TODO show special message if daily api quota exited
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
