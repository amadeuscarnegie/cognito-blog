// --- Section types (discriminated union on `type`) ---

export interface TextSection {
	type: "text";
	content: string;
}

export interface ImageSection {
	type: "image";
	src: string;
	alt: string;
	caption?: string;
	variant?: "full" | "medium";
}

export interface AlertSection {
	type: "alert";
	variant: "info" | "tip" | "success" | "error" | "warning";
	title: string;
	content: string;
}

export interface AccordionSection {
	type: "accordion";
	title: string;
	items: {
		title: string;
		content: string;
	}[];
}

export interface BenefitsSection {
	type: "benefits";
	items: {
		icon: string;
		title: string;
		description: string;
	}[];
}

export interface ChecklistSection {
	type: "checklist";
	title: string;
	description?: string;
	items: string[];
}

export interface TableSection {
	type: "table";
	headers: string[];
	rows: string[][];
}

export interface CtaSection {
	type: "cta";
	variant: "large" | "small";
	title: string;
	description: string;
	buttonText: string;
	buttonUrl: string;
}

export interface RelatedContentSection {
	type: "related-content";
	title: string;
	slugs: string[];
}

export interface DividerSection {
	type: "divider";
}

export type Section =
	| TextSection
	| ImageSection
	| AlertSection
	| AccordionSection
	| BenefitsSection
	| ChecklistSection
	| TableSection
	| CtaSection
	| RelatedContentSection
	| DividerSection;

// --- Article metadata ---

export interface ArticleAuthor {
	name: string;
	avatarUrl?: string;
}

export interface ArticleTags {
	level?: string[];
	subject?: string[];
	theme?: string[];
	audience?: string[];
}

export interface ArticleData {
	title: string;
	slug: string;
	excerpt: string;
	date: string;
	lastUpdated: string | null;
	published: boolean;
	author: ArticleAuthor;
	tags: ArticleTags;
	thumbnailUrl: string;
	illustrationUrl?: string;
	thumbnailBg?: string;
	heroImageUrl: string;
	readingTime: number;
	sections: Section[];
}
