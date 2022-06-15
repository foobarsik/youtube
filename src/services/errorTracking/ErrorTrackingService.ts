import {NavigationContainer} from '@react-navigation/native';

export interface ErrorTrackingService {
	logError(error: Error): void;

	getNavigationContainer(): typeof NavigationContainer;
}
