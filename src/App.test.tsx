import {render} from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import {App} from './App';
import {RootStore, RootStoreProvider} from './modules/common/stores/RootStore';
import {HttpApiService} from './services/api/HttpApiService';
import {BugsnagErrorTrackingService} from './services/errorTracking/BugsnagErrorTrackingService';
import {AsyncStorageService} from './services/storage/AsyncStorageService';

it('renders correctly', async () => {
	const errorTrackingService = new BugsnagErrorTrackingService();
	const rootStore = new RootStore({
		errorTracking: errorTrackingService,
		api: new HttpApiService(),
		storage: new AsyncStorageService(),
	});

	render(
		<RootStoreProvider value={rootStore}>
			<App errorTrackingService={errorTrackingService} />
		</RootStoreProvider>,
	);
});
