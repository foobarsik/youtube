declare module 'react-native-config' {
	export interface NativeConfig {
		RN_RELEASE_TYPE: string;
	}

	export const Config: NativeConfig;
	export default Config;
}
