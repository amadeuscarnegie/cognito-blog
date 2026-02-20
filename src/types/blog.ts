export interface Article {
	id: string;
	title: string;
	slug: string;
	theme: string;
	readingTime: number;
	thumbnailUrl: string;
	illustrationUrl?: string;
	thumbnailBg?: string;
}

export interface Theme {
	id: string;
	name: string;
	slug: string;
	description: string;
}

export interface FAQ {
	id: string;
	question: string;
	answer: string;
}
