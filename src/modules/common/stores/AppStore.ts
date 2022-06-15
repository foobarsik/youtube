import i18n from 'i18next';
import {makeAutoObservable} from 'mobx';
import {initReactI18next} from 'react-i18next';
import {LogBox, Platform, StatusBar} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import RNRestart from 'react-native-restart';
import Reactotron from 'reactotron-react-native';
import {en} from '../../../i18n/en';
import {LanguageDetector} from '../../../i18n/LanguageDetector';
import {Locale} from '../../../i18n/Locale';
import {pl} from '../../../i18n/pl';
import {LoadingState} from '../utils/LoadingState';
import {Screen} from '../utils/Screen';
import {RootStore} from './RootStore';

//Fast refresh causes this warning.
LogBox.ignoreLogs(['i18next: init: i18next is already initialized.']);

export class AppStore {
	rootStore: RootStore;

	initialRouteName: Screen = Screen.START;
	loadingState: LoadingState = LoadingState.PENDING;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this);

		this.rootStore = rootStore;
	}

	//======================
	// Actions
	//======================
	setLoadingState(loadingState: LoadingState) {
		this.loadingState = loadingState;
	}

	//======================
	// API
	//======================
	async init() {
		this.initializeReactotron();
		this.initializeStatusBar();
		await this.initializeTranslations();

		this.setLoadingState(LoadingState.DONE);
		await RNBootSplash.hide({fade: true});
	}

	restartApp() {
		RNRestart.Restart();
	}

	//======================
	// Rest
	//======================
	private initializeStatusBar() {
		StatusBar.setBarStyle('dark-content');
		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor('rgba(0,0,0,0)');
			StatusBar.setTranslucent(true);
		}
	}

	private async initializeTranslations() {
		await i18n
			.use(initReactI18next)
			.use(LanguageDetector)
			.init({
				debug: __DEV__,
				fallbackLng: Locale.EN,
				defaultNS: 'common',
				resources: {en, pl},
				interpolation: {
					escapeValue: false,
				},
				compatibilityJSON: 'v3', //this resolves the issue with i18next on android
			});
	}

	private initializeReactotron() {
		if (__DEV__) {
			Reactotron.configure().useReactNative().connect();
		}
	}
}
