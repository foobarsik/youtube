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
	loadingState: LoadingState = LoadingState.PENDING;
	isMoreToFetch = true;
	nextPageToken: string | undefined;
	categoryId: string | undefined;
	totalResults = 0;
	fetchedResults = 0;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		this.rootStore = rootStore;

		this.getVideos();
	}

	*getVideos(categoryId?: string) {
		if (!this.fetchingMoreFromSameCategory(categoryId)) {
			this.resetStateData();
			this.categoryId = categoryId;
		} else if (!this.isMoreToFetch) {
			return;
		}
		this.setLoadingState(LoadingState.PENDING);
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
			this.setLoadingState(LoadingState.DONE);
			if (response.data.nextPageToken) {
				this.nextPageToken = response.data.nextPageToken;
			} else {
				this.isMoreToFetch = false;
			}
			this.totalResults = response.data.pageInfo.totalResults;
			this.fetchedResults += response.data.pageInfo.resultsPerPage;
		} else {
			// TODO show special message if daily api quota exited
			ErrorHandler.handleApiProblem(
				response as ApiErrorResponse<ServerError>,
				this.rootStore.services.errorTracking,
				this.setLoadingState,
			);
		}
	}

	fetchingMoreFromSameCategory(categoryId: string | undefined) {
		return this.categoryId === categoryId;
	}

	resetStateData() {
		this.videos = [];
		this.nextPageToken = undefined;
		this.isMoreToFetch = true;
		this.fetchedResults = 0;
		this.totalResults = 0;
	}

	setLoadingState(state: LoadingState) {
		this.loadingState = state;
	}

	get isLoading(): boolean {
		return this.loadingState === LoadingState.PENDING;
	}

	get isError(): boolean {
		return [LoadingState.ERROR, LoadingState.NO_CONNECTION].includes(this.loadingState);
	}
}
