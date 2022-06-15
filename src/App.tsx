import styled from '@emotion/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {ErrorBoundary} from './modules/common/components/ErrorBoundry';
import {LoadingStateSwitcher} from './modules/common/components/LoadingStateSwitcher';
import {useStores} from './modules/common/stores/RootStore';
import {Screen} from './modules/common/utils/Screen';
import {StartScreen} from './modules/start/components/StartScreen';
import {ErrorTrackingService} from './services/errorTracking/ErrorTrackingService';

const Stack = createNativeStackNavigator();

type Props = {
	errorTrackingService: ErrorTrackingService;
};

export const App = observer(({errorTrackingService}: Props) => {
	const rootStore = useStores();
	const NavigationContainer = rootStore.services.errorTracking.getNavigationContainer();
	return (
		<ErrorBoundary errorTracking={errorTrackingService}>
			<LoadingStateSwitcher
				loadingState={rootStore.appStore.loadingState}
				tryAgainCallback={rootStore.appStore.restartApp}>
				<AppContainer>
					<NavigationContainer>
						<Stack.Navigator initialRouteName={rootStore.appStore.initialRouteName}>
							<Stack.Screen name={Screen.START} component={StartScreen} />
						</Stack.Navigator>
					</NavigationContainer>
				</AppContainer>
			</LoadingStateSwitcher>
		</ErrorBoundary>
	);
});

const AppContainer = styled.View(() => ({
	flex: 1,
}));
