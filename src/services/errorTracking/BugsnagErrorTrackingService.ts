import BugsnagPluginReactNavigation from '@bugsnag/plugin-react-navigation';
import Bugsnag, {Client} from '@bugsnag/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import {ErrorTrackingService} from './ErrorTrackingService';

LogBox.ignoreLogs(['Bugsnag cannot initialize synchronously when running in the remote debugger.']);
export class BugsnagErrorTrackingService implements ErrorTrackingService {
	private bugsnag: Client;

	constructor() {
		this.bugsnag = Bugsnag.start({
			plugins: [new BugsnagPluginReactNavigation()],
			onError: () => {
				//todo set user here
			},
		});
	}

	getNavigationContainer() {
		const {createNavigationContainer} = this.bugsnag.getPlugin('reactNavigation')!;
		return createNavigationContainer(NavigationContainer);
	}

	logError(error: Error): void {
		this.bugsnag.notify(error);
	}
}
