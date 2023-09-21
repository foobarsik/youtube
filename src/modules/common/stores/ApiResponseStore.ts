import {makeAutoObservable} from 'mobx';
import {LoadingState} from '../utils/LoadingState';
import {ErrorHandler} from '../utils/ErrorHandler';
import {ApiErrorResponse, ApiResponse} from 'apisauce';
import {ServerError} from '../../../services/api/ServerError';
import {Video} from '../../videos/types/video';
import {Videos} from '../../../services/api/Videos';
import {RootStore} from './RootStore';

export class ApiResponseStore {
	private readonly rootStore: RootStore;

	videos: Video[] = [];
	loadingState: LoadingState = LoadingState.PENDING;
	isMoreToFetch = true;
	nextPageToken?: string;
	totalResults = 0;
	fetchedResults = 0;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		this.rootStore = rootStore;
	}

	handle(response: ApiResponse<Videos, ServerError>) {
		if (response.ok && response.data?.items) {
			let videos = response.data.items.map(item => ({
				id: item.id,
				title: item.snippet.title,
				thumbnail: item.snippet.thumbnails.high,
			}));
			this.videos.push(...videos);
			this.loadingState = LoadingState.DONE;
			if (response.data.nextPageToken) {
				this.nextPageToken = response.data.nextPageToken;
			} else {
				this.isMoreToFetch = false;
			}
			this.totalResults = response.data.pageInfo.totalResults;
			this.fetchedResults += response.data.pageInfo.resultsPerPage;
		} else {
			ErrorHandler.handleApiProblem(
				response as ApiErrorResponse<ServerError>,
				this.rootStore.services.errorTracking,
				this.setLoadingState,
			);
		}
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
}
