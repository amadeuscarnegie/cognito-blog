import type { FAQ } from "@/types/blog";
import type { ArticleData } from "@/types/article";
import { BASE_URL } from "@/lib/constants";

type JsonLdData = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdData }) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}

export function organizationJsonLd(): JsonLdData {
	return {
		"@context": "https://schema.org",
		"@type": "EducationalOrganization",
		name: "Cognito",
		url: BASE_URL,
		logo: `${BASE_URL}/favicon.ico`,
		sameAs: [
			"https://youtube.com/@CognitoResources",
			"https://facebook.com/CognitoResources",
			"https://instagram.com/cognitoedu",
		],
	};
}

export function webSiteJsonLd(): JsonLdData {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Cognito Blog",
		url: BASE_URL,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${BASE_URL}/blog/theme/all?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
}

export function faqPageJsonLd(faqs: FAQ[]): JsonLdData {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};
}

export function articleJsonLd(article: ArticleData): JsonLdData {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: article.title,
		description: article.excerpt,
		image: article.heroImageUrl.startsWith("http")
			? article.heroImageUrl
			: `${BASE_URL}${article.heroImageUrl}`,
		author: {
			"@type": "Person",
			name: article.author.name,
		},
		datePublished: article.date,
		...(article.lastUpdated ? { dateModified: article.lastUpdated } : {}),
		publisher: {
			"@type": "EducationalOrganization",
			name: "Cognito",
			url: BASE_URL,
			logo: `${BASE_URL}/favicon.ico`,
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${BASE_URL}/blog/${article.slug}`,
		},
	};
}

export function breadcrumbJsonLd(
	items: { name: string; url: string }[],
): JsonLdData {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: item.url,
		})),
	};
}
