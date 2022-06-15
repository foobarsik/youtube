import {ApiResponse} from 'apisauce';
import {SampleResponse} from './SampleResponse';
import {ServerError} from './ServerError';

export interface ApiService {
	sampleRequest(name: string): Promise<ApiResponse<SampleResponse, ServerError>>;
}
