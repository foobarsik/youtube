declare module 'react-native-config' {
	export interface NativeConfig {
		RN_RELEASE_TYPE: string;
		RN_YOUTUBE_API_KEY: string;
	}

	export const Config: NativeConfig;
	export default Config;
}
