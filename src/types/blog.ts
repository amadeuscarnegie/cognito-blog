export type ThemeSlug = "study-tips" | "science" | "maths" | "wellbeing";
export type ThemeFilterSlug = ThemeSlug | "all";

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
	slug: ThemeFilterSlug;
	description: string;
}

export interface FAQ {
	id: string;
	question: string;
	answer: string;
	keywords?: string[];
}

export interface FAQCategory {
	id: string;
	name: string;
	questions: FAQ[];
}
