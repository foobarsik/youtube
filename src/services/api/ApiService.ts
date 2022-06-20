import {ApiResponse} from 'apisauce';
import {VideoCategories} from './VideoCategories';
import {ServerError} from './ServerError';

export interface ApiService {
	fetchVideoCategories(langCode: string, regionCode: string): Promise<ApiResponse<VideoCategories, ServerError>>;
}
