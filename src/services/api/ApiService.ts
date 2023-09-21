import {ApiResponse} from 'apisauce';
import {VideoCategories} from './VideoCategories';
import {Videos} from './Videos';
import {ServerError} from './ServerError';

export interface ApiService {
	fetchVideoCategories(langCode: string, regionCode: string): Promise<ApiResponse<VideoCategories, ServerError>>;
	fetchVideos(categoryId?: string, nextPageToken?: string): Promise<ApiResponse<Videos, ServerError>>;
}
