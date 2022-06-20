interface Snippet {
	title: string;
	assignable: boolean;
	channelId: string;
}

interface ItemsItem {
	kind: string;
	etag: string;
	id: string;
	snippet: Snippet;
}

export type VideoCategories = {
	kind: string;
	etag: string;
	items: ItemsItem[];
};
