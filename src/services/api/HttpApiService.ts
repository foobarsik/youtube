import {ApiResponse, ApisauceInstance, create} from 'apisauce';
import {ApiService} from './ApiService';
import {SampleResponse} from './SampleResponse';
import {ServerError} from './ServerError';

export class HttpApiService implements ApiService {
	private api: ApisauceInstance;
	constructor() {
		this.api = create({
			baseURL: 'http://localhost:8080',
			headers: {'Content-Type': 'application/json'},
		});
	}

	async sampleRequest(name: string): Promise<ApiResponse<SampleResponse, ServerError>> {
		return this.api.get('/score', {name});
	}
}
