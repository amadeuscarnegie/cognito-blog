import type { FAQ } from "@/types/blog";

type JsonLdData = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdData }) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}

const BASE_URL = "https://cognitolearning.co.uk";

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
