import {ApiResponse, ApisauceInstance, create} from 'apisauce';
import {ApiService} from './ApiService';
import {VideoCategories} from './VideoCategories';
import {ServerError} from './ServerError';
import Config from 'react-native-config';

export class HttpApiService implements ApiService {
	private api: ApisauceInstance;

	constructor() {
		this.api = create({
			baseURL: 'https://www.googleapis.com/youtube/v3',
			headers: {'Content-Type': 'application/json'},
		});
	}

	async fetchVideoCategories(langCode: string, regionCode: string): Promise<ApiResponse<VideoCategories, ServerError>> {
		return this.api.get('/videoCategories', {
			hl: langCode,
			regionCode: regionCode,
			key: Config.RN_YOUTUBE_API_KEY,
		});
	}
}
