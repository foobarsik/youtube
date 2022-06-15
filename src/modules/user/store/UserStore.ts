import {ApiErrorResponse, ApiResponse} from 'apisauce';
import {makeAutoObservable} from 'mobx';
import {SampleResponse} from '../../../services/api/SampleResponse';
import {ServerError} from '../../../services/api/ServerError';
import {RootStore} from '../../common/stores/RootStore';
import {ErrorHandler} from '../../common/utils/ErrorHandler';
import {LoadingState} from '../../common/utils/LoadingState';

export class UserStore {
	private readonly rootStore: RootStore;

	score: number = 0;
	loadingState: LoadingState = LoadingState.DONE;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		this.rootStore = rootStore;
	}

	*getScore(name: string) {
		const response: ApiResponse<SampleResponse, ServerError> = yield this.rootStore.services.api.sampleRequest(name);

		if (response.ok && response.data?.score) {
			this.score = response.data.score;
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
