interface ImageDefault {
	url: string;
	width: number;
	height: number;
}

interface ImageMedium {
	url: string;
	width: number;
	height: number;
}

interface ImageHigh {
	url: string;
	width: number;
	height: number;
}

interface Thumbnails {
	default: ImageDefault;
	medium: ImageMedium;
	high: ImageHigh;
}

interface Localized {
	title: string;
	description: string;
}

interface Snippet {
	publishedAt: string;
	channelId: string;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	channelTitle: string;
	tags: string[];
	categoryId: string;
	liveBroadcastContent: string;
	localized: Localized;
	defaultAudioLanguage: string;
}

interface ItemsItem {
	kind: string;
	etag: string;
	id: string;
	snippet: Snippet;
}

interface PageInfo {
	totalResults: number;
	resultsPerPage: number;
}

export interface Videos {
	kind: string;
	etag: string;
	items: ItemsItem[];
	nextPageToken: string;
	pageInfo: PageInfo;
}
