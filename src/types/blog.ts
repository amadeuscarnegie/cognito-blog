export type ArticleTheme = "Study tips" | "Science" | "Maths" | "Wellbeing";

export interface Article {
	id: string;
	title: string;
	slug: string;
	theme: ArticleTheme;
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
