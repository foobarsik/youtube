import {
	ApiErrorResponse,
	CLIENT_ERROR,
	CONNECTION_ERROR,
	NETWORK_ERROR,
	SERVER_ERROR,
	TIMEOUT_ERROR,
	UNKNOWN_ERROR,
} from 'apisauce';
import {ServerError} from '../../../services/api/ServerError';
import {ErrorTrackingService} from '../../../services/errorTracking/ErrorTrackingService';
import {LoadingState} from './LoadingState';

export class ErrorHandler {
	public static handleApiProblem(
		response: ApiErrorResponse<ServerError>,
		errorTrackingService: ErrorTrackingService,
		loadingStateCallback: (loadingState: LoadingState) => void,
	) {
		const unexpectedErrorBehavior = () => {
			loadingStateCallback(LoadingState.ERROR);
			errorTrackingService.logError(
				new Error(response.originalError?.message || 'Response without data and original error'),
			);
		};

		switch (response.problem) {
			case TIMEOUT_ERROR:
			case CONNECTION_ERROR:
			case NETWORK_ERROR:
				loadingStateCallback(LoadingState.NO_CONNECTION);
				break;
			case SERVER_ERROR:
			case UNKNOWN_ERROR:
				unexpectedErrorBehavior();
				break;
			case CLIENT_ERROR:
				if (response.data?.error?.message) {
					//TODO: tell user what happend
					loadingStateCallback(LoadingState.DONE);
				} else {
					unexpectedErrorBehavior();
				}
				break;
			default:
				unexpectedErrorBehavior();
				break;
		}
	}
}
