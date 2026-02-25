export type ThemeSlug = "study-tips" | "science" | "maths" | "wellbeing";

export interface Article {
	id: string;
	title: string;
	slug: string;
	themeSlug: ThemeSlug;
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
