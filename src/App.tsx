import styled from '@emotion/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {ErrorBoundary} from './modules/common/components/ErrorBoundry';
import {LoadingStateSwitcher} from './modules/common/components/LoadingStateSwitcher';
import {useStores} from './modules/common/stores/RootStore';
import {Screen} from './modules/common/utils/Screen';
import {StartScreen} from './modules/start/components/StartScreen';
import {ErrorTrackingService} from './services/errorTracking/ErrorTrackingService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

MaterialCommunityIcons.loadFont();

const Tab = createBottomTabNavigator();

type Props = {
	errorTrackingService: ErrorTrackingService;
};

export const App = observer(({errorTrackingService}: Props) => {
	const {t} = useTranslation('start');
	const rootStore = useStores();
	const NavigationContainer = rootStore.services.errorTracking.getNavigationContainer();
	return (
		<ErrorBoundary errorTracking={errorTrackingService}>
			<LoadingStateSwitcher
				loadingState={rootStore.appStore.loadingState}
				tryAgainCallback={rootStore.appStore.restartApp}>
				<AppContainer>
					<NavigationContainer>
						<Tab.Navigator initialRouteName={rootStore.appStore.initialRouteName}>
							<Tab.Screen
								name={Screen.START}
								component={StartScreen}
								options={{
									headerShown: false,
									tabBarLabel: t('home'),
									tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="home" color={color} size={size} />,
								}}
							/>
						</Tab.Navigator>
					</NavigationContainer>
				</AppContainer>
			</LoadingStateSwitcher>
		</ErrorBoundary>
	);
});

const AppContainer = styled.View({
	flex: 1,
});
