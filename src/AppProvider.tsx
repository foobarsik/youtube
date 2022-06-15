import {ThemeProvider} from '@emotion/react';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {App} from './App';
import {RootStore, RootStoreProvider} from './modules/common/stores/RootStore';
import {HttpApiService} from './services/api/HttpApiService';
import {BugsnagErrorTrackingService} from './services/errorTracking/BugsnagErrorTrackingService';
import {AsyncStorageService} from './services/storage/AsyncStorageService';
import {Theme} from './theme/Theme';

const errorTrackingService = new BugsnagErrorTrackingService();
const rootStore = new RootStore({
	errorTracking: errorTrackingService,
	api: new HttpApiService(),
	storage: new AsyncStorageService(),
});

export const AppProvider = observer(() => {
	useEffect(() => {
		rootStore.initApp();
	}, []);

	return (
		<RootStoreProvider value={rootStore}>
			<ThemeProvider theme={Theme}>
				<SafeAreaProvider>
					<App errorTrackingService={errorTrackingService} />
				</SafeAreaProvider>
			</ThemeProvider>
		</RootStoreProvider>
	);
});
